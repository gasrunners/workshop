import { type NextPage } from "next"
import { useState } from "react"
import { Call, Network } from '@gasrunners/evm-fetch'
import { useEvmFetch } from "../hooks/useEvmFetch"
import { useImmer } from 'use-immer'

const Zeroxfetch: NextPage = () => {
  const [network, setNetwork] = useState(Network.MAINNET)
  const [rpcUrl, setRpcUrl] = useState<string>(
    'https://mainnet.infura.io/v3/ef4d04e8436847aa9db8b5b3a3c34310'
  )
  const [data, setData] = useState({})
  const [calls, setCalls] = useImmer<Call[]>([])
  const defaultCall: Call = {
    key: 'dai.name',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    function: 'name',
    abi: ['function name() returns (string)'],
    params: []
  }

  const fetcher = useEvmFetch({ network, rpcUrl })

  function addCall() {
    setCalls(oldCalls => [...oldCalls, defaultCall])
  }

  function onChange(callIndex: number, callKey: keyof Call, value: string) {
    setCalls(draft => {
      const call = draft[callIndex] as Call
      if (call && call[callKey]) {
        call[callKey] = callKey === 'abi' ? [value] : value
      }
    })
    console.log('calls', calls)
  }

  function onChangeParam(callIndex: number, index: number, value: string) {
    setCalls(draft => {
      const call = draft[callIndex] as Call
      if (call && call.params?.[index]) {
        call.params[index] = value
      }
    })
    console.log('calls', calls)
  }

  function addParamTo(callIndex: number) {
    setCalls(draft => {
      const call = draft[callIndex] as Call
      if (call) (call.params = call.params || []).push('')
    })
    console.log('calls', calls)
  }

  async function fetch() {
    calls.forEach(call => fetcher?.addCall(call))
    const data = await fetcher?.fetch()
    console.log(data)
    setData(data)
  }

  const paramItems = (callIndex: number) => {
    const call = calls[callIndex]
    return (call?.params || []).map((param, index) => {
      return (
        <div key={index}>
          <input
            type="text"
            name={`${call?.key || ''}_${param}_${index}`}
            value={param}
            onChange={e => onChangeParam(callIndex, index, e.target.value)}
            className="border"
            placeholder={`param ${index}`}
          />
        </div>
      )
    })
  }

  const callItems = calls.map((call, index) => {
    return (
      <div key={index} className="mb-4 rounded-lg p-4 shadow-lg">
        <input
          type="text"
          name="key"
          value={call.key}
          onChange={e => onChange(index, 'key', e.target.value)}
          className="border"
          placeholder="key"
        />
        <input
          type="text"
          name="address"
          value={call.address}
          onChange={e => onChange(index, 'address', e.target.value)}
          className="border"
          placeholder="Contract address"
        />
        <input
          type="text"
          name="function"
          value={call.function as string}
          onChange={e => onChange(index, 'function', e.target.value)}
          className="border"
          placeholder="Function to call"
        />
        <textarea
          name="abi"
          value={call.abi}
          onChange={e => onChange(index, 'abi', e.target.value)}
          className="border"
          placeholder="Function signature"
        />
        <button
          onClick={e => addParamTo(index)}
          className="my-2 rounded bg-purple-500 p-2 text-white">
          Add param
        </button>
        <div className="flex flex-col">
          {paramItems(index)}
        </div>
      </div>
    )
  })
  
  return (
    <>
      <main className="flex w-1/4 flex-col p-8">
        <select
          value={network} 
          onChange={e => setNetwork(e.target.value as Network)}
          className="border "
        >
          <option value={Network.MAINNET}>Ethereum</option>
          <option value={Network.ARBITRUM}>Arbitrum</option>
          <option value={Network.OPTIMISM}>Optimism</option>
          <option value={Network.POLYGON}>Polygon</option>
        </select>
        <input
          name="rpcUrl"
          value={rpcUrl}
          onChange={e => setRpcUrl(e.target.value)}
          className="border"
          placeholder="RPC URL"
        />

        <button
          onClick={addCall}
          className="my-2 rounded bg-purple-500 p-2 text-white">
          Add call
        </button>

        <div className="flex flex-col">
          {callItems}
        </div>

        <button
          onClick={fetch}
          className="my-2 rounded bg-purple-500 p-2 text-white">
          Fetch
        </button>

        <pre><code>{ JSON.stringify(data) }</code></pre>
      </main>
    </>
  )
}

export default Zeroxfetch
