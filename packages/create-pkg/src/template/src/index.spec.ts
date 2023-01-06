import { add } from "."
import { describe, it, expect } from 'vitest'

describe('add', () => {
  it('1 + 1 should equal 2', () => {
    expect(add(1, 1)).toEqual(2)
  })
})
