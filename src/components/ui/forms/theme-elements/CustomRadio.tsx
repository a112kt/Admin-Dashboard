'use client'



import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';


const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 21,
  height: 21,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: 'transparent',
  position: 'relative',
  '.Mui-focusVisible &': {
    outline: `0px auto ${theme.palette.divider}`,
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.divider,
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  boxShadow: 'none',
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
    backgroundImage:
      theme.palette.mode === 'dark'
        ? `radial-gradient(${theme.palette.background.paper},${theme.palette.background.paper} 28%,transparent 32%)`
        : 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',


  },
}));

// Inspired by blueprintjs
function CustomRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color ? `${props.color}.main` : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}

      slotProps={{
        input: {
          'aria-label': 'RadioButton demo'
        }
      }}
      {...props}
    />
  );
}

export default CustomRadio;

























