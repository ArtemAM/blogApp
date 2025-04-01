import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" variant="outlined" sx={{ marginRight: 1 }}>
            Login
          </Button>
          <Button color="inherit" variant="outlined">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
