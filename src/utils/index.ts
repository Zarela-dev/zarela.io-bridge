import BigNumber from 'bignumber.js'

export const normalizeAddress = (address: string): string => address && address.toLowerCase()

export const addressClipper = (address: string): string => {
  if (!address) return ''
  const addressClipped = address.slice(0, 6) + '...' + address.slice(-4)
  return addressClipped
}

export const convertToBiobit = (value, format = true) => {
  if (typeof value === undefined) return 'Invalid value'

  if (format) return new BigNumber(value).dividedBy(1000000000).toFormat()
  return new BigNumber(value).dividedBy(1000000000).toNumber()
}
