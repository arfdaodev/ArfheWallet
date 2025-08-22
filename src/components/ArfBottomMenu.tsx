import React from "react";
import {
  Box,
  FormControl,
  Tab,
  Tabs,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Button,
} from "@mui/material";
import "./ArfBottomMenu.css";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ArfBottomMenu() {
  const [value, setValue] = React.useState(0);

  const [sendAddress, setSendAddress] = React.useState("");
  const [sendToken, setSendToken] = React.useState(0);
  const [sendAmount, setSendAmount] = React.useState(0.0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="arf-bottom-menu">
        <Box>
          <Tabs centered value={value} onChange={handleChange}>
            <Tab label="SEND" />
            <Tab label="RECEIVE" />
            <Tab label="SWAP" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Stack direction="column">
            <TextField
              variant="filled"
              label="Send To Address"
              placeholder="0x"
              fullWidth
              value={sendAddress}
              onChange={(e) => setSendAddress(e.target.value)}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                width: "100%",
                marginTop: "1rem",
                marginBottom: "0.5rem",
              }}
            >
              <FormControl sx={{ flex: "1" }}>
                <InputLabel id="send-token-label">Token</InputLabel>
                <Select
                  labelId="send-token-label"
                  value={sendToken}
                  label="Token"
                  onChange={(event) => {
                    setSendToken(event.target.value as number);
                  }}
                >
                  <MenuItem value={0}>ETH</MenuItem>
                  <MenuItem value={1}>ARF</MenuItem>
                  <MenuItem value={2}>USDT</MenuItem>
                </Select>
              </FormControl>
              <TextField
                variant="filled"
                label="Amount"
                sx={{ marginLeft: "0.5rem" }}
                value={sendAmount}
                onChange={(e) => setSendAmount(parseFloat(e.target.value))}
              />
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ position: "absolute", width: "90%", bottom: "15px" }}
            >
              <Button>CANCEL</Button>
              <Button variant="contained">SEND</Button>
            </Stack>
          </Stack>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}></CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </div>
    </>
  );
}
