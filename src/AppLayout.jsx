import React from 'react';
import { Outlet } from 'react-router';
import ArfBottomBar from './components/ArfBottomBar';
import ArfBar from './components/ArfBar';
import './AppLayout.css';
import { ThemeProvider, Box } from '@mui/material';
import ArfTheme from './components/ArfTheme';

function AppLayout() {
  const [network, setNetwork] = React.useState(1); 
  
  return (
    <div className='app-layout'>
      <ThemeProvider theme={ArfTheme}>
        <Box sx={{ flexShrink: 0 }}>
          <ArfBar network={network} setNetwork={setNetwork}/>
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
