import { type NextPage } from "next";
import { useState } from "react";
import { Network } from '@gasrunners/evm-fetch'

const Etherpi: NextPage = () => {
  const [network, setNetwork] = useState(Network.MAINNET)
  const [rpcUrl, setRpcUrl] = useState<string>('')

  // const fetcher = useEvmFetch({ network, rpcUrl })
  
  return (
    <>
      <main className="flex w-1/4 flex-col">
        <select
          value={network} 
          onChange={e => setNetwork(e.target.value as Network)}
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
        />
      </main>
    </>
  );
};

export default Etherpi;
