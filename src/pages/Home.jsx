import React from "react";
import { Button, Drawer, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./Home.css";

function Home() {
  const [network, setNetwork] = React.useState(1);
  const [networkDrawerOpen, setNetworkDrawerOpen] = React.useState(false);

  const handleNetworkChange = (event) => {
    setNetwork(event.target.value)
  };

  const toggleNetworkDrawer = () => {
    setNetworkDrawerOpen(!networkDrawerOpen)
  }

  return (
    <div className='home'>
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

      <Button variant="outlined" onClick={toggleNetworkDrawer}>Hello World!</Button>
    </div>
  );
}

export default Home;