# EVMFetch

[![npm
(tag)](https://img.shields.io/npm/v/@gasrunners/evm-fetch)](https://www.npmjs.com/package/@gasrunners/evm-fetch)

EVMFetch is a simple wrapper around multicaller contracts that makes fetching
onchain data simple and intuitive.

## Usage

Install:

```bash
npm install @gasrunners/evm-fetch
```

Instantiate an EVMFetch instance:

```ts
import { EVMFetch, Network } from '@gasrunners/evm-fetch'
import { ERC20_ABI } from '@gasrunners/common-abi'

evmFetch = new EVMFetch({
  network: Network.MAINNET,
  provider: <YOUR_RPC_URL> // e.g. `https://mainnet.infura.io/v3/${YOUR_INFURA_KEY}`,
})
```

Add multical onchain calls from different contracts:

```ts
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
```

Then fetch the results:

```ts
const data = await evmFetch.fetch()

console.log(data) // { dai: 'Dai Stablecoin', uni: 'Uniswap' }
```
