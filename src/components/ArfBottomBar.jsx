import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Button,
  Drawer,
  Box,
  Typography,
} from "@mui/material";
import "./ArfBottomBar.css";
import { History, Home, Send, Lock, Search } from "@mui/icons-material";
import ArfBottomMenu from "./ArfBottomMenu";

export default function ArfBottomBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="arf-bottom-bar">
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={(e, r) => setDrawerOpen(false)}
        color="#fff"
      >
        <ArfBottomMenu />
      </Drawer>

      <BottomNavigation
        showLabels >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Explore" icon={<Search />} />
        <Fab
          color="primary" 
          variant="extended" 
          onClick={(e) => setDrawerOpen(true)}
          sx={{
            backgroundColor: "transparent",     // remove default filled bg
            color: "#e2e3e4ff",                   // primary text/icon color
            border: "2px solid #cfcfcfff",        // outline
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)", // subtle hover
            },
          }}>
          <Send />
        </Fab>
        <BottomNavigationAction label="History" icon={<History />} />
        <BottomNavigationAction label="Security" icon={<Lock />} />
      </BottomNavigation>
    </div>
  );
}
