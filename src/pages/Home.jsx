import React from "react";
import { Button, Drawer, FormControl, InputLabel, MenuItem, Select, Alert, Typography, Box, Card, Paper, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Icon, Tooltip, Avatar, Chip } from "@mui/material";
import "./Home.css";
import { Label, Check, Circle, ContentCopy } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";

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

      <Paper elevation={2}>
        <Alert icon={<Check fontSize="inherit" />} severity="success">
          The USDT transfer of 10.00 from 0x0000..00aa to 0xf33f..d00d is successful. 
          TX ID: 0x012301230123012301230123123
          <Button onClick={toggleNetworkDrawer}>
            CHECK
          </Button>
        </Alert>
      </Paper>

      <Box sx={{ margin: 2, textAlign: "center" }}>
        <Chip label={NETWORK_NAMES[network]} avatar={<Avatar src={NETWORK_AVATAR_SRC[network]} />} variant="outlined"/>

        <Tooltip title="Coptid">
          <Typography textAlign="center">
              0x0000..00aa
          </Typography>
        </Tooltip>
      </Box>

      <Paper elevation="6" variant="outlined">
        <Box sx={{ margin: 2 }}>
          <Typography variant="h3" textAlign="center" fontWeight={500}>
            $0.00
          </Typography>
        </Box>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          height={225}
        />
      </Paper>

      <Box padding="5">
        <List>
          {[
            { name: "ARF", icon: "coin.svg" },
            { name: "ETH", icon: "eth.png" },
            { name: "USDT", icon: "usdt.png" },
          ].map(({ name, icon }) => (
            <ListItem key={name} disablePadding>
              <Paper sx={{ flex: 1, width: "100%" }}>
                <ListItemButton sx={{ justifyContent: "space-between" }}>
                  <Box display="flex" alignItems="center">
                    <ListItemIcon sx={{ minWidth: "auto", marginRight: 1 }}>
                      <Avatar src={icon} />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </Box>
                  <ListItemText
                    primary="0.00"
                    sx={{ textAlign: "right", flex: "0 0 auto" }}
                  />
                </ListItemButton>
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>

    </div>
  );
}

export default Home;