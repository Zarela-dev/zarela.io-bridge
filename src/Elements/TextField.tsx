import { Label, Input, Textarea } from '@rebass/forms/styled-components'
import Image from 'next/image'
import React from 'react'
import { SxStyleProp } from 'rebass'
import { Box } from 'rebass/styled-components'
import { Text } from './Typography'

const Icon = ({ src, iconPosition = 'left' }: { src: StaticImageData; iconPosition: 'left' | 'right' | undefined }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: iconPosition === 'left' ? 3 : 'unset',
        right: iconPosition === 'right' ? 3 : 'unset',
        top: 3,
      }}
    >
      <Image src={src} alt="search" layout="fixed" width={24} height={24} />
    </Box>
  )
}

const TextField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  error,
  disabled,
  required,
  multiline,
  sx,
  rows,
  icon,
  iconPosition,
}: {
  label?: string
  name: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  type?: string
  error?: string
  disabled?: boolean
  multiline?: boolean
  rows?: number
  required?: boolean
  sx?: SxStyleProp
  icon?: StaticImageData
  iconPosition?: 'left' | 'right'
}) => {
  if (multiline)
    return (
      <Box
        sx={{
          opacity: disabled ? 0.5 : 1,
          position: 'relative',
          marginTop: 5,
          marginBottom: 5,
          ...sx,
        }}
      >
        {label ? (
          <Text
            sx={{
              color: 'content.700',
              position: 'absolute',
              top: -2,
              left: 4,
              marginLeft: -1,
              paddingLeft: 1,
              paddingRight: 1,
              backgroundColor: 'background.surface',
            }}
            variant="typography.labelSmall"
            color="content.700"
          >
            <Label htmlFor={label}>{required ? `${label} *` : label}</Label>
          </Text>
        ) : null}
        <Textarea
          sx={{
            minHeight: '48px',
            fontFamily: 'inter',
            borderRadius: 2,
            borderColor: error ? 'danger.main' : 'other.border',
            borderWidth: 1,
            borderStyle: 'solid',
            padding: 4,
            paddingLeft: icon && iconPosition === 'left' ? 44 : 4,
            paddingRight: icon && iconPosition === 'right' ? 44 : 4,
            transition: 'border 180ms ease-in-out',
            backgroundColor: 'background.surface',
            color: 'content.900',
            '&::-webkit-input-placeholder': {
              color: 'content.700',
            },
            '&:-moz-placeholder': {
              /* FF 4-18 */
              color: 'content.700',
              opacity: 1,
            },
            '&::-moz-placeholder': {
              /* FF 19+ */
              color: 'content.700',
              opacity: 1,
            },
            '&:-ms-input-placeholder': {
              /* IE 10+ */
              color: 'content.700',
            },
            '&::-ms-input-placeholder': {
              /* Microsoft Edge */
              color: 'content.700',
            },
            '&::placeholder': {
              /* modern browser */
              color: 'content.700',
            },
            ':disabled': {
              cursor: 'not-allowed',
            },
            '&:focus-visible': {
              borderColor: 'content.800',
              outline: 'none',
            },
          }}
          id={label}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
        />
        {icon ? <Icon src={icon} iconPosition={iconPosition} /> : null}
        {error ? (
          <Text ml={4} variant="typography.labelSmall" color="content.700" mt={2}>
            {error}
          </Text>
        ) : null}
      </Box>
    )
  return (
    <Box
      sx={{
        opacity: disabled ? 0.5 : 1,
        position: 'relative',
        marginTop: 5,
        marginBottom: 5,
        ...sx,
      }}
    >
      {label ? (
        <Text
          sx={{
            color: 'content.700',
            position: 'absolute',
            top: -2,
            left: 4,
            marginLeft: -1,
            paddingLeft: 1,
            paddingRight: 1,
            backgroundColor: 'background.surface',
          }}
          variant="typography.labelSmall"
          color="content.700"
        >
          <Label htmlFor={label}>{required ? `${label} *` : label}</Label>
        </Text>
      ) : null}
      <Input
        sx={{
          height: '48px',
          borderRadius: 2,
          borderColor: error ? 'danger.main' : 'other.border',
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 4,
          paddingLeft: icon && iconPosition === 'left' ? 44 : 4,
          paddingRight: icon && iconPosition === 'right' ? 44 : 4,
          transition: 'border 180ms ease-in-out',
          backgroundColor: 'background.surface',
          color: 'content.900',
          '&::-webkit-input-placeholder': {
            color: 'content.700',
          },
          '&:-moz-placeholder': {
            /* FF 4-18 */
            color: 'content.700',
            opacity: 1,
          },
          '&::-moz-placeholder': {
            /* FF 19+ */
            color: 'content.700',
            opacity: 1,
          },
          '&:-ms-input-placeholder': {
            /* IE 10+ */
            color: 'content.700',
          },
          '&::-ms-input-placeholder': {
            /* Microsoft Edge */
            color: 'content.700',
          },
          '&::placeholder': {
            /* modern browser */
            color: 'content.700',
          },
          ':disabled': {
            cursor: 'not-allowed',
          },
          '&:focus-visible': {
            borderColor: 'content.800',
            outline: 'none',
          },
        }}
        id={label}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
      />
      {icon ? <Icon src={icon} iconPosition={iconPosition} /> : null}
      {error ? (
        <Text ml={4} variant="typography.labelSmall" color="content.700" mt={2}>
          {error}
        </Text>
      ) : null}
    </Box>
  )
}

export default TextField
