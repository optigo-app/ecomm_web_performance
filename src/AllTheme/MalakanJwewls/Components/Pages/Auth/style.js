export const MuiInputPlaceholder = {
  '& .MuiInputBase-input': {
    fontFamily: '$rown', // Make sure this is defined correctly
    color: 'white',
    '&::placeholder': {
      color: 'white',
    },
  },
  '& .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white', // Change border color if needed
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Change label color if needed
  },

  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'white',
    '&.Mui-focused': {
      color: 'white',
    },
  },
  '& .MuiFormHelperText-root': {
    color: '#f44336', // red for error, customize as needed
  },
}
