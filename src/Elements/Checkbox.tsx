import Image from 'next/image'
import { Box } from 'rebass/styled-components'
import styled from 'styled-components'
import { height } from 'styled-system'
import checkIcon from '../../public/images/icons/checkmark.svg'
import { Icon } from './Icon'

const Input = styled.input`
  display: none;
`

//https://codepen.io/AllThingsSmitty/pen/WjZVjo?editors=1100
const Checkbox = (props) => {
  const { name, onChange, checked, children, disabled, sx, ...rest } = props

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
          backgroundColor: checked ? 'success.main' : 'darkTheme.400',
          borderColor: checked ? 'success.dark' : 'darkTheme.500',
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
        <Input
          type="checkbox"
          name={name}
          checked={checked}
          disabled={disabled}
          id={'checkbox' + name}
          onChange={!disabled ? onChange : undefined}
        />
      </Box>
      <Box ml={2}>{children}</Box>
    </Box>
  )
}

export default Checkbox
