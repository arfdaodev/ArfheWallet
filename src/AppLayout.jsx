import { Outlet } from 'react-router';
import ArfBottomBar from './components/ArfBottomBar';
import ArfBar from './components/ArfBar';
import './AppLayout.css';
import { ThemeProvider, Box } from '@mui/material';
import ArfTheme from './components/ArfTheme';

function AppLayout() {
  return (
    <div className='app-layout'>
      <ThemeProvider theme={ArfTheme}>
        <Box sx={{ flexShrink: 0 }}>
          <ArfBar />
        </Box>

        <Box className="content-box">
          <Outlet />
        </Box>

        <Box sx={{ flexShrink: 0 }}>
          <ArfBottomBar />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default AppLayout;
