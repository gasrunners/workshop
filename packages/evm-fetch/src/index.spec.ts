import dotenv from 'dotenv'
import path from 'path'
import { describe, it, expect, beforeEach } from 'vitest'
import { EVMFetch, MulticallerAddressMap, Network } from './index'
import { ERC20_ABI } from '@gasrunners/common-abi'

dotenv.config({ path: path.resolve(__dirname, './../../../.env') })

describe('EVMFetch', () => {
  let evmFetch: EVMFetch

  beforeEach(() => {
    evmFetch = new EVMFetch({
      network: Network.MAINNET,
      provider: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    })
  })

  it('Instantiates successfully', () => {
    expect(evmFetch).toBeTruthy()
  })

  it('Sets default attributes', () => {
    expect(evmFetch.requireAll).toEqual(false)
    expect(evmFetch.address).toEqual(MulticallerAddressMap[Network.MAINNET])
    expect(evmFetch.options).toEqual({})
  })

  it('Fetches data from single contract', async () => {
    evmFetch.addCall({
      key: 'name',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // Dai ERC20
      function: 'name',
      abi: ERC20_ABI,
    })

    const data = await evmFetch.fetch<{ name: string }>()

    expect(data.name).toEqual('Dai Stablecoin')
  })

  it('Fetches data from multiple contracts', async () => {
    evmFetch
      .addCall({
        key: 'dai.name',
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', // Dai ERC20
        function: 'name',
        abi: ERC20_ABI,
      })
      .addCall({
        key: 'uni.name',
        address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', // Uniswap ERC20
        function: 'name',
        abi: ERC20_ABI,
      })

    const data = await evmFetch.fetch()

    expect(data.dai.name).toEqual('Dai Stablecoin')
    expect(data.uni.name).toEqual('Uniswap')
  })

  it('Fetches data on polygon', async () => {
    const polygonFetch = new EVMFetch({
      network: Network.POLYGON,
      // eslint-disable-next-line max-len
      provider: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    })

    polygonFetch.addCall({
      key: 'name',
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // Dai ERC20
      function: 'name',
      abi: ERC20_ABI,
    })

    const data = await polygonFetch.fetch<{ name: string }>()

    expect(data.name).toEqual('(PoS) Dai Stablecoin')
  })

  it('Fetches data on Arbitrum', async () => {
    const arbitrumFetch = new EVMFetch({
      network: Network.ARBITRUM,
      // eslint-disable-next-line max-len
      provider: `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    })

    arbitrumFetch.addCall({
      key: 'name',
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // Dai ERC20
      function: 'name',
      abi: ERC20_ABI,
    })

    const data = await arbitrumFetch.fetch<{ name: string }>()

    expect(data.name).toEqual('Dai Stablecoin')
  })

  it('Fetches data on Optimism', async () => {
    const optimismFetch = new EVMFetch({
      network: Network.OPTIMISM,
      // eslint-disable-next-line max-len
      provider: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    })

    optimismFetch.addCall({
      key: 'name',
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // Dai ERC20
      function: 'name',
      abi: ERC20_ABI,
    })

    const data = await optimismFetch.fetch<{ name: string }>()

    expect(data.name).toEqual('Dai Stablecoin')
  })
})
