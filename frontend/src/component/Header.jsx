import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Header() {
  const isAuth = false;

  const renderAuthButtons = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button color="inherit" variant="outlined" sx={{ marginRight: 1 }}>
        Create post
      </Button>
      <Button color="inherit" variant="outlined">
        Logout
      </Button>
    </Box>
  );

  const renderGuestButtons = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button color="inherit" variant="outlined" sx={{ marginRight: 1 }}>
        Login
      </Button>
      <Button color="inherit" variant="outlined">
        Sign Up
      </Button>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blog
        </Typography>
        {isAuth ? renderAuthButtons() : renderGuestButtons()}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
