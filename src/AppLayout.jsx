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
        <ArfBar />
        <Box className="content-box">
          <Outlet />
        </Box>
        <ArfBottomBar />
      </ThemeProvider>
    </div>
  );
};

export default AppLayout;


