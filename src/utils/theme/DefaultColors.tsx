declare module '@mui/material/styles' {
  interface Palette {
    blackColor: {
      black100: string;
      black80: string;
      black60: string;
      black40: string;
      black20: string;
      black10: string;
      black5: string;
    };
  }
  interface Palette {
    whiteColor: {
      white100: string;
      white80: string;
      white60: string;
      white40: string;
      white20: string;
      white10: string;
      white5: string;
    };
  }
  interface Palette {
    purple: {
      main: string;
      light: string
    };
  }

  interface PaletteOptions {
    blackColor?: {
      black100: string;
      black80: string;
      black60: string;
      black40: string;
      black20: string;
      black10: string;
      black5: string;
    };
  }

  interface PaletteOptions {
    whiteColor?: {
      white100: string;
      white80: string;
      white60: string;
      white40: string;
      white20: string;
      white10: string;
      white5: string;
    };
  }
  interface PaletteOptions {
    purple: {
      main: string;
      light: string
    };
  }
}

const baselightTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#165A50',
      light: '#165a501a'
    },
    secondary: {
      main: '#C2FD75',
      light: '#C2FD7526',

    },
    success: {
      main: '#70C748',
      light: '#93D97326',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#EBF3FE',
      contrastText: '#ffffff',

    },
    error: {
      main: '#EF4444',
      light: '#FEF2F2',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F6B51E',
      light: '#FEF3CD',
      contrastText: '#ffffff',

    },
    purple: {
      main: '#8754EC',
      light: '#8754EC26',
      contrastText: '#ffffff',
    },
    blackColor: {
      black100: '#030E09',
      black80: '#030E09CC',
      black60: '#030E0999',
      black40: '#030E0966',
      black20: '#030E0933',
      black10: '#030E091A',
      black5: '#030E090D'
    },
    whiteColor: {
      white100: '#FFFFFF',
      white80: '#FFFFFFCC',
      white60: '#FFFFFF99',
      white40: '#FFFFFF66',
      white20: '#FFFFFF33',
      white10: '#FFFFFF1A',
      white5: '#FFFFFF0D'
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.04,
      hover: '#053b2514',
    },
    background: {
      default: '#F5F5F5',
      dark: '#2A3547',
      paper: '#ffffff',
    },
    text: {
      primary: '#030E09CC',
      secondary: '#030E0966',

    },
    divider: '#030E091A',
  },
};

const baseDarkTheme = {
  direction: 'ltr',
  palette: {
    primary: {
      main: '#165A50',
      light: '#165a5040',
    },
    secondary: {
      main: '#C2FD75',
      light: '#c2fd754d',
    },
    success: {
      main: '#70C748',
      light: '#93D97326',
      contrastText: '#ffffff',
    },
    info: {
      main: '#539BFF',
      light: '#223662',
      contrastText: '#ffffff',
    },
    error: {
      main: '#EF4444',
      light: '#3B1515',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F6B51E',
      light: '#3B2E0F',
      contrastText: '#ffffff',
    },
    purple: {
      main: '#8754EC',
      light: '#8754EC26',
      contrastText: '#ffffff',
    },
    blackColor: {
      black100: '#FFFFFF',
      black80: '#FFFFFFCC',
      black60: '#FFFFFF99',
      black40: '#FFFFFF66',
      black20: '#030E0933',
      black10: '#030E091A',
      black5: '#FFFFFF0D'
    },
    whiteColor: {
      white100: '#030E09',
      white80: '#FFFFFFCC',
      white60: '#FFFFFF99',
      white40: '#FFFFFF66',
      white20: '#FFFFFF33',
      white10: '#FFFFFF1A',
      white5: '#FFFFFF0D'
    },
    action: {
      disabledBackground: 'rgba(73,82,88,0.12)',
      hoverOpacity: 0.04,
      hover: '#053B2526',
    },
    divider: '#FFFFFF1A',
    text: {
      primary: '#FFFFFFCC',
      secondary: '#FFFFFF66',
    },
    background: {
      default: '#141a18',
      dark: '#2A3547',
      paper: '#ffffff',
    },
  },
};

export { baseDarkTheme, baselightTheme };


