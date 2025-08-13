import React from "react";
import { AppBar, Box, Button, Toolbar, Typography, IconButton, FormControl, InputLabel, Select, MenuItem, Drawer, Avatar, Chip} from "@mui/material";
// import { MenuIcon } from "@mui/icons-material";
import { Menu } from "@mui/icons-material";
import "./ArfBar.css";

const NETWORK_NAMES = [
  "UNKNOWN",
  "Ethereum",
  "Zama.ai",
  "Fhenix",
]

const NETWORK_AVATAR_SRC = [
  "",
  "eth.png",
  "discorvery.png",
  "discorvery.png",
]

function ArfBar({
  network,
  setNetwork
}) {

  const [networkDrawerOpen, setNetworkDrawerOpen] = React.useState(false);
  
  const handleNetworkChange = (event) => {
    setNetwork(event.target.value)
  };

  const toggleNetworkDrawer = () => {
    setNetworkDrawerOpen(!networkDrawerOpen)
  }
  
  return (
    <div className="arf-bar">
      <Drawer anchor="top" open={networkDrawerOpen} onClose={toggleNetworkDrawer}>
        <div className="network-select">
          <FormControl fullWidth>
            <InputLabel id="network-select-label">Network</InputLabel>
            <Select
              labelId="network-select-label"
              id="network-select"
              value={network}
              label="Network"
              onChange={handleNetworkChange}
            >
              <MenuItem value={1}>Ethereum</MenuItem>
              <MenuItem value={2}>Zama.ai</MenuItem>
              <MenuItem value={3}>Fhenix</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Drawer>


      <Box sx={{ 
        flexGrow: 1
        }}>
        <AppBar color="transparent" elevation={0} position="fixed">
          <Toolbar className="arf-toolbar">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
            <Box className="arf-toolbar-name">
              <Typography textAlign="center" fontSize={12}>
                biar.arf
              </Typography>
              <Typography textAlign="center" fontSize={12}>
                0x0000..00aa
              </Typography>
            </Box>

            <Button onClick={toggleNetworkDrawer}>
              <Avatar src={NETWORK_AVATAR_SRC[network]} fontSize="10" />
            </Button>

            
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default ArfBar;