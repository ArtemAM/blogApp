import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginSlice } from '../redux/slices/login.slice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(loginSlice.selectors.selectIsAuth);

  const handleLogoutClick = () => {
    const isConfirmed = window.confirm('Are you sure you want to logout?');
    if (isConfirmed) {
      dispatch(loginSlice.actions.logout());
      navigate('/');
      localStorage.removeItem('token');
    }
  };

  const renderAuthButtons = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button color="inherit" variant="outlined" sx={{ marginRight: 1 }}>
        <Link
          to={'/create-post'}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Create post
        </Link>
      </Button>
      <Button color="inherit" variant="outlined" onClick={handleLogoutClick}>
        Logout
      </Button>
    </Box>
  );

  const renderGuestButtons = () => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button color="inherit" variant="outlined">
        <Link
          to={'/register'}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Register
        </Link>
      </Button>
      <Button color="inherit" variant="outlined" sx={{ marginRight: 1 }}>
        <Link
          to={'/login'}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          Login
        </Link>
      </Button>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
          }}
        >
          <Link to="/" className="link">
            Blog
          </Link>
        </Typography>
        {isAuth ? renderAuthButtons() : renderGuestButtons()}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
