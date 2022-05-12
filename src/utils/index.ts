import BigNumber from 'bignumber.js'
import { timeSince } from './timeSince'
import { copyToClipboard } from './copyToClipboard'

export const normalizeAddress = (address: string): string => address && address.toLowerCase()

export const addressClipper = (address: string): string => {
  if (!address) return ''
  const addressClipped = address.slice(0, 6) + '...' + address.slice(-4)
  return addressClipped
}

export const hashClipper = (hash: string): string => {
  if (!hash) return ''
  const hashClipped = hash.slice(0, 6) + '...' + hash.slice(-8)
  return hashClipped
}

export const convertToBiobit = (value, format = true) => {
  if (typeof value === undefined) return 'Invalid value'

  if (format) return new BigNumber(value).dividedBy(1000000000).toFormat()
  return new BigNumber(value).dividedBy(1000000000).toNumber()
}

export { timeSince, copyToClipboard }
