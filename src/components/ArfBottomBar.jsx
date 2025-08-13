import { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Fab, Button, Drawer, Box, Typography } from "@mui/material";
import "./ArfBottomBar.css";
import { History, Home, Send, Lock, Search } from "@mui/icons-material";

export default function ArfBottomBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="arf-bottom-bar">
      <BottomNavigation
        showLabels
      >
        <BottomNavigationAction label="Home" icon={<Home />}/>
        <BottomNavigationAction label="Explore" icon={<Search />}/>
        <Fab color="primary">
          <Send />
        </Fab>
        <BottomNavigationAction label="History" icon={<History />}/>
        <BottomNavigationAction label="Security" icon={<Lock />}/>
      </BottomNavigation>
    </div>
  );
}