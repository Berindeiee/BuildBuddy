import React, { useState } from 'react';
import { Container, TextField, Button, Box, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ViewPassword from '../atoms/ViewPassword';
import '../../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/snackbar.jsx';
import NavBar from '../organisms/Navbar.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setSeverity, setMessage, showSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xs">
        <Box className="box"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <div className='textTitlu'>Login</div>

          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <ViewPassword
              password={password}
              onPasswordChange={(e) => setPassword(e.target.value)}
            />

            <Button className='button'
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                borderRadius: '10px',
                backgroundColor: '#000000',
                '&:hover': { backgroundColor: '#9F9F9F' }
              }}
            >
              Login
            </Button>

            <Link to="/register" sx={{ textDecoration: 'none', mt: 2 }}>
              <Typography className="link" variant="body2" align="center" marginTop="1rem">
                Nu ai cont? Înregistrează-te aici!
              </Typography>
            </Link>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;