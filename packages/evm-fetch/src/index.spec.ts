import { describe, it, expect, beforeEach } from 'vitest'
import { add, EVMFetch, Network } from './index'

describe('EVMFetch', () => {
  let evmFetch
  beforeEach(() => {
    evmFetch = new EVMFetch({
      network: Network.MAINNET,
      provider: ''
    })
  })
})
