import { describe, expect, it } from 'vitest'
import { evaluateExpression } from './evaluator'

describe('scientific calculations', () => {
  it('calculates trigonometric functions in degrees', () => {
    expect(evaluateExpression('sin(30)', 'deg')).toBeCloseTo(0.5)
    expect(evaluateExpression('cos(60)', 'deg')).toBeCloseTo(0.5)
    expect(evaluateExpression('tan(45)', 'deg')).toBeCloseTo(1)
  })

  it('calculates trigonometric functions in radians', () => {
    expect(evaluateExpression('sin(1.5707963267948966)', 'rad')).toBeCloseTo(1)
  })

  it('calculates inverse trigonometric functions', () => {
    expect(evaluateExpression('asin(1)', 'deg')).toBeCloseTo(90)
    expect(evaluateExpression('acos(0)', 'deg')).toBeCloseTo(90)
    expect(evaluateExpression('atan(1)', 'deg')).toBeCloseTo(45)
  })

  it('supports constants and logarithms', () => {
    expect(evaluateExpression('ln(e)')).toBeCloseTo(1)
    expect(evaluateExpression('log(100)')).toBeCloseTo(2)
    expect(evaluateExpression('pi')).toBeCloseTo(Math.PI)
  })

  it('supports powers and roots', () => {
    expect(evaluateExpression('square(5)')).toBe(25)
    expect(evaluateExpression('cube(3)')).toBe(27)
    expect(evaluateExpression('sqrt(81)')).toBe(9)
    expect(evaluateExpression('cbrt(-27)')).toBe(-3)
  })

  it('supports factorial', () => {
    expect(evaluateExpression('factorial(5)')).toBe(120)
    expect(evaluateExpression('factorial(0)')).toBe(1)
  })

  it('rejects invalid mathematical inputs', () => {
    expect(() => evaluateExpression('ln(-1)')).toThrow()
    expect(() => evaluateExpression('sqrt(-1)')).toThrow()
    expect(() => evaluateExpression('factorial(2.5)')).toThrow()
    expect(() => evaluateExpression('asin(2)')).toThrow()
  })
})