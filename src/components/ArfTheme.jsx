import { createTheme } from "@mui/material"

const ArfTheme = createTheme({
  palette: {
    primary: {
      main: '#1b1b1b',
      contrastText: '#ffffff', // for buttons, etc.
    },
    text: {
      primary: '#ffffff',  // default text color
    },
  },
  typography: {
    fontFamily: [
      "Funnel Display",
      "sans-serif",
    ].join(','),
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        colorPrimary: {
          color: '#ffffff', // forces all Typography with color="primary" to be white
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        textPrimary: {
          color: '#ffffff', // forces text-only buttons with color="primary" to be white
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e", // dark background
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#fff", // unselected icon color
          "&.Mui-selected": {
            color: "#f7b119ff", // selected icon color
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          color: '#ffffff', // all tab labels default to white
        },
        indicator: {
          backgroundColor: '#ffffff', // underline color
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#ffffff', // default text color
          '&.Mui-selected': {
            color: '#ffffff', // selected tab text color
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff', // label color
          '&.Mui-focused': {
            color: '#ffffff', // focused label
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: '#ffffff', // text inside the field
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#ffffff', // border color
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff', // hover border
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff', // focused border
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: '#ffffff',          // text color inside the select
          backgroundColor: '#1b1b1b', // select background
        },
        icon: {
          color: '#ffffff',          // dropdown arrow color
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1b1b1b', // dropdown menu background
          color: '#ffffff',           // menu items text color
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#333333', // selected item background
            '&:hover': {
              backgroundColor: '#444444', // hover on selected
            },
          },
          '&:hover': {
            backgroundColor: '#2a2a2a', // hover background
          },
        },
      },
    },
  },
});



export default ArfTheme;