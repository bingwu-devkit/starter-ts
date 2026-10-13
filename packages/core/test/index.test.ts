import { describe, expect, it } from 'vitest'
import { ZodError } from 'zod'

import { greet, greetNameSchema } from '../src/index.js'

describe('greet', () => {
  it('greets the provided name', () => {
    expect(greet('TypeScript')).toBe('Hello, TypeScript!')
  })

  it('trims surrounding whitespace and preserves spaces within the name', () => {
    expect(greet(' \tType Script\n ')).toBe('Hello, Type Script!')
  })

  it.each(['', ' ', '\t\n'])('rejects an empty name %j', (name) => {
    expect(() => greet(name)).toThrow(ZodError)
  })

  it.each<unknown>([null, undefined, 42, false, {}, []])(
    'rejects a non-string name %j at runtime',
    (name) => {
      // @ts-expect-error Intentionally pass non-string inputs from JavaScript callers.
      expect(() => greet(name)).toThrow(ZodError)
    },
  )
})

describe('greetNameSchema', () => {
  it('exposes the normalized name through parse', () => {
    expect(greetNameSchema.parse('  TypeScript  ')).toBe('TypeScript')
  })

  it('returns the normalized name from a successful safeParse', () => {
    expect(greetNameSchema.safeParse('  TypeScript  ')).toEqual({
      success: true,
      data: 'TypeScript',
    })
  })

  it('returns a ZodError from safeParse without throwing', () => {
    const result = greetNameSchema.safeParse('   ')

    expect(result).toMatchObject({
      success: false,
      error: expect.any(ZodError),
    })
  })
})
