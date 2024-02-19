import { useSnackbar } from '../../context/snackbar.jsx'; // Asigurați-vă că calea este corectă
import { Button } from '@mui/material';
import NavBar from '../organisms/Navbar.jsx';

const Home_page = () => {
  const { setSeverity, setMessage, showSnackbar } = useSnackbar();

  const handleClick = () => {
    setSeverity('success');
    setMessage('Mesaj afișat cu succes!');
    showSnackbar();
  };

  return (
    <>
      <NavBar />
      <h1>Home Page</h1>
      <Button onClick={handleClick}>Arată Snackbar</Button>
    </>
  );
}

export default Home_page;
