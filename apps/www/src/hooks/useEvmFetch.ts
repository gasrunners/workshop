import { EVMFetch, Network } from "@gasrunners/evm-fetch";
import { useEffect, useState } from "react";

export function useEvmFetch(
  { network, rpcUrl }: { network: Network, rpcUrl: string }
) {
  const [fetcher, setFetcher] = useState<EVMFetch>()

  useEffect(() => {
    if (!rpcUrl) return
    setFetcher(new EVMFetch({
      network: network,
      provider: rpcUrl
    }))
  }, [network, rpcUrl])
  
  return fetcher;
}
