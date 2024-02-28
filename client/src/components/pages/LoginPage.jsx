import React, { useState } from 'react';
import { Container, TextField, Button, Box, Snackbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ViewPassword from '../atoms/ViewPassword';
import '../../Styles/Login.css';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../context/snackbar.jsx';
import NavBar from '../organisms/Navbar.jsx';
import SvgIcon from '@mui/material/SvgIcon';
import { auth } from '../../config/firebase_config';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const LoginPage = () => {

  const ButtonColr = '#ffffff'
  const ButtonHover = '#f0f0d0'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setSeverity, setMessage, showSnackbar } = useSnackbar();

  const GoogleSVGIcon = () => (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
    >
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </SvgIcon>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(auth?.currentUser?.email);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);
      navigate('/login');
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setSeverity('error');
      setMessage(errorMessage);
      showSnackbar();
    }

  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // Dacă autentificarea este reușită, obțineți utilizatorul autentificat
      const user = result.user;
      console.log(user);
      navigate('/some-protected-route');
    } catch (error) {
      // Gestionați erorile aici
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      setSeverity('error');
      setMessage(errorMessage);
      showSnackbar();
    }
  };


  return (
    <>

      <NavBar />
      <div className="loginBackground">
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
                  color: 'black',
                  backgroundColor: ButtonColr,
                  border: '1px solid #3f51b5',
                  '&:hover': { backgroundColor: ButtonHover }
                }}
              >
                Login
              </Button>
              <Button
                className='button'
                fullWidth
                variant="contained"
                startIcon={<GoogleSVGIcon />}
                sx={{
                  mt: 2,
                  borderRadius: '10px',
                  backgroundColor: ButtonColr,
                  color: 'black',
                  border: '3px solid #4285F4',
                  '&:hover': {
                    backgroundColor: ButtonHover,
                    borderColor: '#357ae8',
                  },
                  textTransform: 'none',
                }}
                onClick={handleGoogleSignIn}
              >
                Autentificare cu Google
              </Button>

              <Link to="/register" sx={{ textDecoration: 'none', mt: 2 }}>
                <Typography className="link" variant="body2" align="center" marginTop="1rem">
                  Nu ai cont? Înregistrează-te aici!
                </Typography>
              </Link>
            </form>
          </Box>
        </Container>
      </div >
    </>
  );
};

export default LoginPage;