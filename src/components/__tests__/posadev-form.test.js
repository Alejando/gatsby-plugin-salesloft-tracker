import { generateRandomCode } from '../forms/posadev-form'

describe('trivia-posadev-form', () => {
  it('code should have same prefix', () => {
    const code =  generateRandomCode('prefix')
    expect(code).toContain('prefix')
  })
  it('code should be different', () => {
    const code1 = generateRandomCode('prefix')
    const code2 = generateRandomCode('prefix')
    expect(code1).not.toBe(code2)
  })
  it('prefix should be cleand', () => {
    const code = generateRandomCode('víctor')
    expect(code).toContain('victor')
  })
})
