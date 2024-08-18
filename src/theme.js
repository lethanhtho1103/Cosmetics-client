const { createTheme } = require('@mui/material');

const theme = createTheme({
  palette: {
    primary: {
      main: '#e67e23',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light,
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: '#cccac6',
          //   },
          // },
          '& fieldSet': {
            borderWidth: '1px !important',
          },
        }),
      },
    },
  },
});

export default theme;
