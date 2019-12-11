import { createMuiTheme } from '@material-ui/core/styles';

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

const getElevations = () => {
  const map = {};
  Object.keys(opacityMap).forEach(key => {
    map[`elevation${key}`] = {
      backgroundColor: `rgba(255, 255, 255, ${opacityMap[key]})`,
    };
  });

  return map;
};

export default createMuiTheme({
  palette: {
    type: 'dark',
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
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor: '#121212',
      },
      ...getElevations(),
    },
  },
});
