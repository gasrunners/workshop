import { FunctionFragment, Interface } from '@ethersproject/abi'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import set from 'lodash.set'

export function add(a: number, b: number): number {
  return a + b
}

/**
 * TYPES
 */
export type Call = {
  key: string
  address: string
  function: string | FunctionFragment
  abi: ContractInterface
  params?: any[]
}

export enum Network {
  MAINNET = '1',
  KOVAN = '42',
  POLYGON = '137',
  ARBITRUM = '42161'
}

export const MulticallerAddressMap = {
  '1': '0x5ba1e12693dc8f9c48aad8770482f4739beed696',
  '5': '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
  '137': '0x275617327c958bD06b5D6b871E7f491D76113dd8',
  '42161': '0x5ba1e12693dc8f9c48aad8770482f4739beed696'
}

export type Args = {
  network?: Network | null,
  provider?: JsonRpcProvider | string | null,
  options?: Record<string, any> | null
  requireAll?: boolean | null
}
const args: Args = {}

export class EVMFetch {
  public address: string
  public provider: JsonRpcProvider
  public calls: Call[] = []
  public paths: string[] = []
  public options?: Record<string, any> | null
  public requireAll?: boolean | null

  /**
   * Initialize multicaller instance.
   * 
   * @param {Network} args.network - Network to make contract calls on.
   * @param {JsonRpcProvider|string} args.provider - RPC URL or Ethers.js
   * JsonRpcProvider for making contract calls.
   * @param {Record<string,any>} args.options - Global options for all contract calls.
   * @param {boolean} args.requireAll - Requires all calls to be
   * successful, otherwise can return partial results.
   */
  constructor({ network = null, provider = null, options = {}, requireAll = false } = args) {
    if (!network) throw new Error('Must pass network argument')
    if (!provider) throw new Error('Must pass provider argument')

    this.address = this.getMulticallerAddress(network)
    this.provider = this.getProvider(provider)
    this.options = options
    this.requireAll = requireAll
  }

  /**
   * Adds a contract call to the calls array.
   * 
   * @param {string} callParams.key - Key to use for results object.
   * @param {address} callParams.address - Contract address for call.
   * @param {string|FunctionFragment} callParams.function - Function to call on contract.
   * @param {ContractInterface} callParams.abi - Contract ABI.
   * @param {any[]} callParams.params - Contract function input params.
   */
  public addCall(callParams: Call): EVMFetch {
    this.calls.push(callParams)
    this.paths.push(callParams.key)
    return this
  }

  /**
   * Executes all calls added via addCall.
   * 
   * @param {Object} from - An object to inject with results of calls.
   * @returns Object with results at specified key paths.
   */
  public async fetch<T>(from?: Object): Promise<T> {
    const obj = from || {}
    const result = await this._fetch()
    result.forEach((r, i) => set(obj, this.paths[i], r))
    this.calls = []
    this.paths = []
    return obj as T
  }

  /**
   * PRIVATE METHODS
   */
  private async _fetch<T>(): Promise<(T | null)[]> {
    const multicaller = this.getMulticallerInstance()
    const interfaces = this.callInterfaces()

    try {
      const res: [boolean, string][] = await multicaller.tryAggregate(
        // if false, allows individual calls to fail without causing entire multicall to fail
        this.requireAll,
        this.encodedCalls(),
        this.options
      )

      return res.map(([success, returnData], i) => {
        if (!success) return null
        const decodedResult = interfaces[i].decodeFunctionResult(
          this.calls[i].function,
          returnData
        )
        // Automatically unwrap any simple return values
        return decodedResult.length > 1 ? decodedResult : decodedResult[0]
      })
    } catch (e) {
      return Promise.reject(e)
    }
  }

  private getMulticallerInstance(): Contract {
    return new Contract(
      this.address,
      [
        'function tryAggregate(bool requireSuccess, tuple(address, bytes)[] memory calls) public view returns (tuple(bool, bytes)[] memory returnData)'
      ],
      this.provider
    )
  }

  private callInterfaces(): Interface[] {
    return this.calls.map(call => new Interface(call.abi))
  }

  private encodedCalls(): Array<string[]> {
    const interfaces = this.callInterfaces()

    return this.calls.map((call, i) => [
      call.address.toLowerCase(),
      interfaces[i].encodeFunctionData(call.function, call.params)
    ])
  }

  private getMulticallerAddress(network: Network): string {
    try {
      return MulticallerAddressMap[network]
    } catch (error) {
      throw new Error(`EVMFetch does not support this network: ${network}`)
    }
  }

  private getProvider(provider: JsonRpcProvider | string): JsonRpcProvider {
    try {
      if (typeof provider === 'string') {
        return new JsonRpcProvider(provider)
      } else {
       return provider
      }  
    } catch (error) {
      throw new Error(`EVMFetch unable to establish provider for: ${provider}`)
    }
  }
}
