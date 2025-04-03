import { Container } from '@mui/material';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchAuthUser } from './redux/slices/login.slice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
