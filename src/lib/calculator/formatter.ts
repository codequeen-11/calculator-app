export function formatResult(value: number): string {
  if (!Number.isFinite(value)) {
    return 'Error'
  }

  if (Object.is(value, -0) || value === 0) {
    return '0'
  }

  const normalized = Number(value.toPrecision(12))

  if (Math.abs(normalized) >= 1e12 || Math.abs(normalized) < 1e-7) {
    return normalized.toExponential(6).replace(/\.?0+e/, 'e')
  }

  return normalized.toLocaleString('en-US', {
    useGrouping: true,
    maximumFractionDigits: 10,
  })
}