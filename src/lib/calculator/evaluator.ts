type Token = number | '+' | '-' | '×' | '÷' | '*' | '/' | '^' | '%' | '(' | ')'

export class CalculatorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CalculatorError'
  }
}

function tokenize(input: string): Token[] {
  const source = input.replace(/\s/g, '')
  const tokens: Token[] = []
  let position = 0

  while (position < source.length) {
    const remaining = source.slice(position)
    const numberMatch = remaining.match(/^(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i)

    if (numberMatch) {
      const value = Number(numberMatch[0])

      if (!Number.isFinite(value)) {
        throw new CalculatorError('Number is out of range')
      }

      tokens.push(value)
      position += numberMatch[0].length
      continue
    }

    const character = source[position]

    if ('+-×÷*/^%()'.includes(character)) {
      tokens.push(character as Exclude<Token, number>)
      position += 1
      continue
    }

    throw new CalculatorError(`Invalid character: ${character}`)
  }

  return tokens
}

class Parser {
  private position = 0
  private readonly tokens: Token[]

  constructor(tokens: Token[]) {
    this.tokens = tokens
  }

  private peek(): Token | undefined {
    return this.tokens[this.position]
  }

  private consume(): Token {
    const token = this.tokens[this.position]

    if (token === undefined) {
      throw new CalculatorError('Incomplete expression')
    }

    this.position += 1
    return token
  }

  parse(): number {
    if (this.tokens.length === 0) {
      throw new CalculatorError('Enter an expression')
    }

    const result = this.parseExpression()

    if (this.position !== this.tokens.length) {
      throw new CalculatorError('Invalid expression')
    }

    if (!Number.isFinite(result)) {
      throw new CalculatorError('Result is out of range')
    }

    return Object.is(result, -0) ? 0 : result
  }

  private parseExpression(): number {
    let value = this.parseTerm()

    while (this.peek() === '+' || this.peek() === '-') {
      const operator = this.consume()
      const right = this.parseTerm()

      value = operator === '+' ? value + right : value - right
    }

    return value
  }

  private parseTerm(): number {
    let value = this.parseUnary()

    while (
      this.peek() === '×' ||
      this.peek() === '÷' ||
      this.peek() === '*' ||
      this.peek() === '/'
    ) {
      const operator = this.consume()
      const right = this.parseUnary()

      if ((operator === '÷' || operator === '/') && right === 0) {
        throw new CalculatorError('Cannot divide by zero')
      }

      value =
        operator === '×' || operator === '*'
          ? value * right
          : value / right
    }

    return value
  }

  private parseUnary(): number {
    if (this.peek() === '+') {
      this.consume()
      return this.parseUnary()
    }

    if (this.peek() === '-') {
      this.consume()
      return -this.parseUnary()
    }

    return this.parsePower()
  }

  private parsePower(): number {
    const base = this.parsePostfix()

    if (this.peek() === '^') {
      this.consume()
      const exponent = this.parseUnary()
      return base ** exponent
    }

    return base
  }

  private parsePostfix(): number {
    let value = this.parsePrimary()

    while (this.peek() === '%') {
      this.consume()
      value /= 100
    }

    return value
  }

  private parsePrimary(): number {
    const token = this.consume()

    if (typeof token === 'number') {
      return token
    }

    if (token === '(') {
      const value = this.parseExpression()

      if (this.consume() !== ')') {
        throw new CalculatorError('Missing closing parenthesis')
      }

      return value
    }

    throw new CalculatorError('Expected a number')
  }
}

export function evaluateExpression(expression: string): number {
  return new Parser(tokenize(expression)).parse()
}