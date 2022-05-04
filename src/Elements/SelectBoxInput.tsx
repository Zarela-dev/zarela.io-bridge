import React, { useEffect, useState } from 'react'
import { Label, Select, Input } from '@rebass/forms/styled-components'
import { Box } from 'rebass/styled-components'
import { Text } from './Typography'
import { CheckboxInput } from './CheckboxInput'
import { Icon } from './Icon'

const SelectBoxInput = ({
  label,
  usage,
  name,
  defaultValue,
  onchange,
  placeholder,
  options,
  setOptions,
  required,
  desabled,
  error,
  handleChechItem,
  equipments,
  setEquipments,
  selected,
  setSelected,
}: {
  label?: string
  usage?: string
  name: string
  defaultValue?: string
  onchange?: (
    event:
      | {
          target: {
            name: string
            value: string
          }
        }
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  placeholder?: string
  desabled?: boolean
  options: any[]
  setOptions?: (options: any[]) => void
  required?: boolean
  error?: string
  handleChechItem?: (event: React.ChangeEvent<HTMLInputElement>) => void
  equipments?: string[]
  setEquipments?: (equipments: string[]) => void
  selected?: string
  setSelected?: (selected: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {usage === 'multi-select' ? (
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              width: '100%',
              height: '48px',
              borderRadius: 2,
              borderColor: error ? 'danger.main' : 'other.border',
              borderWidth: 1,
              borderStyle: 'solid',
              padding: 4,
            }}
          >
            <Icon
              src="/images/shapes/arrow-up.svg"
              variant="small"
              sx={{
                transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'all 0.5s',
              }}
            />
            <Text>{placeholder}</Text>
          </Box>

          {isOpen && (
            <Box
              sx={{
                backgroundColor: 'background.other',
                position: 'absolute',
                top: '56px',
                width: '100%',
                height: 220,
                borderRadius: 2,
                padding: 5,
                zIndex: 2,
                overflowY: 'scroll',
                animation: 'open 0.5s ease',
                transition: 'opacity 0.5s ease',
                '@keyframes open': {
                  '0%': {
                    opacity: 0,
                  },
                  '100%': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box>
                {Object.entries(options).map(([key, item]) => {
                  return (
                    <CheckboxInput
                      key={key}
                      usage="multi-select"
                      value={equipments?.includes(item.name)}
                      onClick={handleChechItem}
                      title={item.name}
                    />
                  )
                })}
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
          }}
          onMouseLeave={() => setIsOpen(false)}
        >
          <Box
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              width: '100%',
              borderRadius: 2,
              borderColor: error ? 'danger.main' : 'other.border',
              borderWidth: 1,
              borderStyle: 'solid',
              padding: 4,
            }}
          >
            <Icon
              src="/images/shapes/arrow-up.svg"
              variant="small"
              sx={{
                transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: 'all 0.5s',
              }}
            />
            <Text>{selected ? selected : placeholder}</Text>
          </Box>

          {isOpen && (
            <Box
              sx={{
                backgroundColor: 'background.other',
                position: 'absolute',
                top: 0,
                width: '100%',
                height: 276,
                borderRadius: 2,
                padding: 5,
                paddingTop: '20px',
                zIndex: 2,
                marginTop: '50px',
                overflowY: 'scroll',
                animation: 'open 0.5s ease',
                transition: 'opacity 0.5s ease',
                '@keyframes open': {
                  '0%': {
                    opacity: 0,
                  },
                  '100%': {
                    opacity: 1,
                  },
                },
              }}
            >
              <Box>
                {Object.entries(options).map(([key, item]) => {
                  return (
                    <Box
                      sx={{
                        padding: 2,
                      }}
                      key={key}
                      name={item.name}
                      onClick={(e) => {
                        setIsOpen(false)
                        if (name) {
                          setSelected(item.name)
                        }
                        onchange({
                          target: {
                            name: name,
                            value: name === 'country' ? item.isoCode : item.name,
                          },
                        })
                      }}
                    >
                      <Text>{item.name} </Text>
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  )
}

export default SelectBoxInput
