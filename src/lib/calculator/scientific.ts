import type { AngleMode } from '@/types/calculator'
import { CalculatorError } from './evaluator'

const toRadians = (value: number, mode: AngleMode): number =>
  mode === 'deg' ? (value * Math.PI) / 180 : value

const fromRadians = (value: number, mode: AngleMode): number =>
  mode === 'deg' ? (value * 180) / Math.PI : value

export function applyScientificFunction(
  name: string,
  value: number,
  angleMode: AngleMode,
): number {
  let result: number

  switch (name) {
    case 'sin':
      result = Math.sin(toRadians(value, angleMode))
      break
    case 'cos':
      result = Math.cos(toRadians(value, angleMode))
      break
    case 'tan': {
      const radians = toRadians(value, angleMode)

      if (Math.abs(Math.cos(radians)) < 1e-12) {
        throw new CalculatorError('Undefined tangent')
      }

      result = Math.tan(radians)
      break
    }
    case 'asin':
      if (value < -1 || value > 1) {
        throw new CalculatorError('Input must be between -1 and 1')
      }
      result = fromRadians(Math.asin(value), angleMode)
      break
    case 'acos':
      if (value < -1 || value > 1) {
        throw new CalculatorError('Input must be between -1 and 1')
      }
      result = fromRadians(Math.acos(value), angleMode)
      break
    case 'atan':
      result = fromRadians(Math.atan(value), angleMode)
      break
    case 'sinh':
      result = Math.sinh(value)
      break
    case 'cosh':
      result = Math.cosh(value)
      break
    case 'tanh':
      result = Math.tanh(value)
      break
    case 'ln':
      if (value <= 0) throw new CalculatorError('Input must be positive')
      result = Math.log(value)
      break
    case 'log':
      if (value <= 0) throw new CalculatorError('Input must be positive')
      result = Math.log10(value)
      break
    case 'sqrt':
      if (value < 0) throw new CalculatorError('Cannot take square root of a negative number')
      result = Math.sqrt(value)
      break
    case 'cbrt':
      result = Math.cbrt(value)
      break
    case 'reciprocal':
      if (value === 0) throw new CalculatorError('Cannot divide by zero')
      result = 1 / value
      break
    case 'square':
      result = value ** 2
      break
    case 'cube':
      result = value ** 3
      break
    case 'exp':
      result = Math.exp(value)
      break
    case 'exp10':
      result = 10 ** value
      break
    case 'factorial': {
      if (!Number.isInteger(value) || value < 0 || value > 170) {
        throw new CalculatorError('Factorial requires an integer from 0 to 170')
      }

      result = 1
      for (let i = 2; i <= value; i += 1) result *= i
      break
    }
    default:
      throw new CalculatorError(`Unknown function: ${name}`)
  }

  if (!Number.isFinite(result)) {
    throw new CalculatorError('Result is out of range')
  }

  return Object.is(result, -0) ? 0 : result
}