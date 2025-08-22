import React, { useEffect } from "react";
import { Button, Drawer, FormControl, InputLabel, MenuItem, Select, Alert, Typography, Box, Card, Paper, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Icon, Tooltip, Avatar, Chip } from "@mui/material";
import "./Home.css";
import { Label, Check, Circle, ContentCopy } from "@mui/icons-material";
import { LineChart } from "@mui/x-charts";
import { AppContext, WalletContext } from "../AppContext.js";
import { useArfBar } from "../components/ArfBarContext.js";
import ArfGraph from "../components/ArfGraph.js";

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

const TOKENS = [
  { name: "ETH", icon: "eth.png" },
  { name: "USDT", icon: "usdt.png" },
  { name: "ARF", icon: "coin.svg" },
];

const demoData = [
  { x: 0, y: 2 },
  { x: 1, y: 5.5 },
  { x: 2, y: 2 },
  { x: 3, y: 8.5 },
  { x: 4, y: 1.5 },
  { x: 5, y: 5 },
];

function Home() {
  const wallet_context = React.useContext<AppContext | undefined>(WalletContext);
  if (!wallet_context)
    return;

  const { setTitle, setText } = useArfBar();

  const [active, setActive] = React.useState(
    wallet_context.accountManager.GetActiveIndex()
  )

  const [network, setNetwork] = React.useState(1);
  const [networkDrawerOpen, setNetworkDrawerOpen] = React.useState(false);

  const getActiveTitle = () => {
    const account = wallet_context.accountManager.accounts[active];
    return account?.GetName() ?? "Unnamed";
  }

  const getActiveText = () => {
    const account = wallet_context.accountManager.accounts[active];

    let text = account?.GetPubKey();

    if (text) {
      const first = text.slice(0, 6);
      const last = text.slice(-4);
      text = first + "...." + last;
    }

    return text ?? "Unnamed";
  }

  const handleNetworkChange = (event: any) => {
    setNetwork(event.target.value)
  };

  const toggleNetworkDrawer = () => {
    setNetworkDrawerOpen(!networkDrawerOpen)
  }

  useEffect(() => {
    setTitle(getActiveTitle());
    setText(getActiveText());
  })

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

      { 
      /*
        <Paper elevation={2}>
          <Alert icon={<Check fontSize="inherit" />} severity="success" >
            The USDT transfer of 10.00 from 0x0000..00aa to 0xf33f..d00d is successful. 
            TX ID: 0x012301230123012301230123123
            <Button>
              CHECK
            </Button>
          </Alert>
        </Paper>
        */
      }

      <Box sx={{ padding: 2 }} className="infobox">
        {/* text section (with padding) */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h3" fontWeight={700}>
            $0.00
          </Typography>
          <Typography variant="body1" color="success.main" fontWeight={700}>
            +0.00 (0%)
          </Typography>
        </Box>

        {/* graph section (full width, ignoring padding) */}
        <Box sx={{ mx: -2, mb: -2 }}> 
          <ArfGraph data={demoData}/>
        </Box>
      </Box>
      
      { /*<LineChart
        xAxis={[
          { data: [1, 2, 3, 5, 8, 10], }
        ]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            color: "#979797",
          },
        ]}
        height={225}
      /> */ }

      

      <Box className="list">
        <List >
          {TOKENS.map(({ name, icon }) => (
            <ListItem
              className="list-item"
              key={name}
              secondaryAction={
                <Typography fontWeight={600} textAlign="right">
                  0.00
                </Typography>
              }
            >
              <ListItemIcon>
                <Avatar src={icon} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </Box>

    </div>
  );
}

export default Home;