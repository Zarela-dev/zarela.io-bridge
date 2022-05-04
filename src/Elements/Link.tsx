import { ReactElement } from 'react'
import { default as NextLink } from 'next/link'
import { Link as RebassLink, SxStyleProp } from 'rebass/styled-components'

export const Link = ({
  children,
  href,
  rel,
  target,
  sx,
  isMagnetic = false,
  onMouseEnter,
  onMouseLeave,
}: {
  children: ReactElement
  href: string
  rel?: string
  target?: string
  sx?: SxStyleProp
  isMagnetic?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}) => {
  return (
    <NextLink passHref href={href}>
      {isMagnetic ? (
        <RebassLink
          rel={rel}
          sx={{ textDecoration: 'none', position: 'relative', ...{ ...sx } }}
          target={target}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </RebassLink>
      ) : (
        <RebassLink
          sx={{ textDecoration: 'none', position: 'relative', ...{ ...sx } }}
          target={target}
          rel={rel}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </RebassLink>
      )}
    </NextLink>
  )
}
