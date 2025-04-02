import { Container } from '@mui/material';
import Header from './component/Header';
import { Outlet } from 'react-router-dom';

function App() {
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
