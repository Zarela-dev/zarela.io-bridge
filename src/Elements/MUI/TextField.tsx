import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

const MUITextField = (props: TextFieldProps) => {
  return (
    <TextField
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#70697A',
          borderRadius: '8px',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#70697A',
          borderWidth: 1,
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#ECEBED',
          borderWidth: 1,
        },
        '& .MuiOutlinedInput-input': {
          outline: '0',
          color: '#fff',
          height: '48px',
          boxSizing: 'border-box',
        },
        '& .Mui-error .MuiSvgIcon-root': {
          fill: '#FF6846',
        },
        '& .MuiSvgIcon-root': {
          fill: '#ecebed',
        },
        '& .MuiInputLabel-root': {
          lineHeight: '22px',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#CCC9D1',
        },
        '& .Mui-error.Mui-focused.MuiInputLabel-root': {
          color: '#FF6846',
        },
      }}
      {...props}
    />
  )
}

export default MUITextField
