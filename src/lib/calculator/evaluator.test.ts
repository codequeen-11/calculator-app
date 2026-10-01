import { describe, expect, it } from 'vitest'
import {
  CalculatorError,
  evaluateExpression,
} from './evaluator'

describe('evaluateExpression', () => {
  it.each([
    ['2+3', 5],
    ['2+3×4', 14],
    ['(2+3)×4', 20],
    ['10/4', 2.5],
    ['2^3', 8],
    ['2^3^2', 512],
    ['-5+8', 3],
    ['50%', 0.5],
    ['0.1+0.2', 0.3],
    ['2e3+1', 2001],
  ])('evaluates %s', (expression, expected) => {
    expect(evaluateExpression(expression)).toBeCloseTo(expected)
  })

  it.each([
    '1/0',
    '2+',
    '(2+3',
    '2+3)',
    'hello',
    '',
  ])('rejects invalid expression: %s', (expression) => {
    expect(() => evaluateExpression(expression)).toThrow(CalculatorError)
  })
})