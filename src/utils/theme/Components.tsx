import { Theme } from '@mui/material'
import './DefaultColors'


const components: any = (theme: Theme) => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "::selection": {
          backgroundColor: theme.palette.secondary.main,
          color: 'black',
        },
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          height: '100%',
          width: '100%',
        },
        a: {
          textDecoration: 'none',
        },
        body: {
          height: '100%',
          margin: 0,
          padding: 0,
        },
        '#root': {
          height: '100%',
        },
        '.mui-nniyr1-MuiCollapse-root-MenuBar-root-RichTextField-menuBar-MenuBar-sticky, .mui-anumxs-FieldContainer-notchedOutline':
        {
          borderColor: `${theme.palette.divider} !important`,
        },
        "*[dir='rtl'] .buyNowImg": {
          transform: 'scaleX(-1)',
        },
        '.signup-bg': {
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
        },
        '.MuiBox-root': {
          borderRadius: theme.shape.borderRadius,
        },
        '.MuiCardHeader-action': {
          alignSelf: 'center !important',
        },
        '.scrollbar-container': {
          borderRight: '0 !important',
        },

      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: 'none',

        },
        sizeSmall: {
          width: 30,
          height: 30,
          minHeight: 30,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },
        },
        colorPrimary: {
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          },
        },
        colorSecondary: {
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'white',
          },
        },
        colorSuccess: {
          '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: 'white',
          },
        },
        colorError: {
          '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: 'white',
          },
        },
        colorWarning: {
          '&:hover': {
            backgroundColor: theme.palette.warning.main,
            color: 'white',
          },
        },
        colorInfo: {
          '&:hover': {
            backgroundColor: theme.palette.info.main,
            color: 'white',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',

        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },

        },
        outlined: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedSecondary: {
          color: 'black',
        },

        text: {
          padding: '5px 15px',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,

          },
        },
        textPrimary: {
          backgroundColor: theme.palette.primary.light,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          },
        },
        textSecondary: {
          backgroundColor: theme.palette.secondary.light,
          color: 'black',
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'black',
          },
        },
        textSuccess: {
          backgroundColor: theme.palette.success.light,
          '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: 'white',
          },
        },
        textError: {
          backgroundColor: theme.palette.error.light,
          '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: 'white',
          },
        },
        textInfo: {
          backgroundColor: theme.palette.info.light,
          '&:hover': {
            backgroundColor: theme.palette.info.main,
            color: 'white',
          },
        },
        textWarning: {
          backgroundColor: theme.palette.warning.light,
          '&:hover': {
            backgroundColor: theme.palette.warning.main,
            color: 'white',
          },
        },
        outlinedPrimary: {
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          },
        },
        outlinedSecondary: {
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: 'black',
          },
        },
        outlinedError: {
          '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: 'white',
          },
        },
        outlinedSuccess: {
          '&:hover': {
            backgroundColor: theme.palette.success.main,
            color: 'white',
          },
        },
        outlinedInfo: {
          '&:hover': {
            backgroundColor: theme.palette.info.main,
            color: 'white',
          },
        },
        outlinedWarning: {
          '&:hover': {
            backgroundColor: theme.palette.warning.main,
            color: 'white',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: '100%',
          padding: '15px',
          backgroundImage: 'none',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiGridItem: {
      styleOverrides: {
        root: {
          paddingTop: '30px',
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.75rem',
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline':
          {
            borderColor: theme.palette.primary.main,
          },
        },
        input: {
          padding: '12px 14px',
        },
        inputSizeSmall: {
          padding: '8px 14px',
        },
      },
    },


    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
          background: theme.palette.text.primary,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderColor: `${theme.palette.divider}`,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: theme.palette.mode === 'dark' ? '#1B3A28' : '#E8F5E9',
          color: theme.palette.mode === 'dark' ? '#A5D6A7' : '#2E7D32',
        },
        standardError: {
          backgroundColor: theme.palette.mode === 'dark' ? '#3B1515' : '#FFEBEE',
          color: theme.palette.mode === 'dark' ? '#EF9A9A' : '#C62828',
        },
        standardWarning: {
          backgroundColor: theme.palette.mode === 'dark' ? '#3B2E0F' : '#FFF8E1',
          color: theme.palette.mode === 'dark' ? '#FFD54F' : '#E65100',
        },
        standardInfo: {
          backgroundColor: theme.palette.mode === 'dark' ? '#223662' : '#E3F2FD',
          color: theme.palette.mode === 'dark' ? '#90CAF9' : '#1565C0',
        },
      },
    },
  }
}

export default components

