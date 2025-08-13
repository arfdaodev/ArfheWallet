import { AppBar, Box, Button, Toolbar, Typography, IconButton} from "@mui/material";
// import { MenuIcon } from "@mui/icons-material";
import { Menu } from "@mui/icons-material";
import "./ArfBar.css";

function ArfBar() {
  return (
    <div className="arf-bar">
      <Box sx={{ 
        flexGrow: 1
        }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}>
              <Menu />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              ArfheWallet
            </Typography>
            <Button color="inherit"></Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default ArfBar;