import { createTheme } from '@mui/material/styles';

const opacityMap = {
  0: 0,
  1: 0.05,
  2: 0.07,
  3: 0.08,
  4: 0.09,
  6: 0.11,
  8: 0.12,
  12: 0.14,
  16: 0.15,
  24: 0.16,
};

const mix = (base, opacity) => {
  const color = base
    .match(/\d{2}/g)
    .map((hex) => {
      const background = Number.parseInt(hex, 16);
      const mixed = background + (0xff - background) * opacity;
      return Math.round(mixed).toString(16);
    })
    .join('');

  return `#${color}`;
};

const getElevations = () => {
  const map = {};
  Object.keys(opacityMap).forEach((key) => {
    map[`elevation${key}`] = {
      backgroundColor: mix('#121212', opacityMap[key]),
    };
  });

  return map;
};

export default createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#121212',
      default: '#121212',
    },
    primary: {
      main: '#2bb24c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#4caf50',
      contrastText: '#fff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
        },
        ...getElevations(),
      },
    },
  },
});
