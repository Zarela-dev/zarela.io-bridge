import React from 'react'
import { Label, Checkbox } from '@rebass/forms'
import { Text } from './Typography'
import { Button } from './Button'

// eslint-disable-next-line react/display-name
export const CheckboxInput = React.forwardRef((props: any, _ref) => {
  return (
    <>
      {props.usage === 'multi-select' ? (
        <Label
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '19px',
          }}
        >
          <Checkbox
            id={props.title}
            name={props.title}
            checked={props.value}
            onChange={props.onClick}
            sx={{
              color: '#34C889',
            }}
          />
          <Text variant="typography.labelMedium" as="span">
            {props.title}
          </Text>
        </Label>
      ) : (
        <Button variant="checkbox" onClick={props.onClick} borderColor={props.value ? 'success.main' : 'transparent'}>
          <Label
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Checkbox
              id="remember"
              name="remember"
              checked={props.value}
              sx={{
                color: '#34C889',
              }}
            />
            <Text variant="typography.labelMedium" as="span">
              {props.title}
            </Text>
          </Label>
        </Button>
      )}
    </>
  )
})

//usage
{
  /* <Card variant="card.primary"><Text variant="typography.displayLarge" as="h1">hello world</Text></Card> */
}
