import Image from 'next/image'
import { Box } from 'rebass/styled-components'
import styled from 'styled-components'
import checkIcon from '../../public/images/icons/checkmark.svg'
import clockIcon from '../../public/images/icons/clock-2.svg'

const Input = styled.input`
  display: none;
`

//https://codepen.io/AllThingsSmitty/pen/WjZVjo?editors=1100
const Checkbox = (props) => {
  const { name, onChange, checked, children, disabled, pending, sx, ...rest } = props

  return (
    <Box sx={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
      <Box
        as="label"
        htmlFor={'checkbox' + name}
        sx={{
          display: 'flex',
          position: 'relative',
          borderRadius: '50%',
          width: '21px',
          height: '21px',
          backgroundColor: checked ? 'success.main' : pending ? 'transparent' : 'darkTheme.400',
          borderColor: checked ? 'success.dark' : pending ? 'transparent' : 'darkTheme.500',
          borderWidth: 1,
          borderStyle: 'solid',
          opacity: disabled ? '0.5' : '1',
        }}
        {...rest}
      >
        {checked && (
          <Box sx={{ position: 'relative', top: '4px', left: '3px' }}>
            <Image width="12px" height="12px" alt="v" src={checkIcon} />
          </Box>
        )}
        {pending && (
          <Box sx={{ position: 'relative', top: '0px', left: '0px' }}>
            <Image width="24px" height="24px" alt="v" src={clockIcon} />
          </Box>
        )}
        <Input
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          id={'checkbox' + name}
          onChange={!disabled && !pending ? onChange : undefined}
        />
      </Box>
      <Box ml={2}>{children}</Box>
    </Box>
  )
}

export default Checkbox
