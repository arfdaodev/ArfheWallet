import { AppBar, Box, Button, Toolbar, Typography, IconButton, Avatar} from "@mui/material";
// import { MenuIcon } from "@mui/icons-material";
import { Menu } from "@mui/icons-material";
import "./ArfBar.css";

function ArfBar() {
  return (
    <div className="arf-bar">
      <Box sx={{ 
        flexGrow: 1
        }}>
        <AppBar color="transparent" elevation={0} position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default ArfBar;