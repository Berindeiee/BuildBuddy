import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import PasswordCheck from '../molecules/PasswordCheck';
import '../../Styles/Login.css';
import NavBar from '../organisms/Navbar.jsx';


function RegisterPage() {
    const [fullName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(password);
    }, [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (!isPasswordValid) {
            setErrorMessage(
                'Parola tebuie să conțină cel puțin o literă mică, o literă mare, o cifră și să aibă cel puțin 8 caractere.'
            );
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage('Parolele nu se potrivesc.');
            return;
        }
    
    };

    return (
        <>
        <NavBar />
        <Container maxWidth="xs">
            <Box
                className="box"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <div className='textTitlu'>Înregistrare cont</div>
                <form onSubmit={handleSubmit}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Username"
                        value={fullName}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordCheck
                        onPasswordChange={(e) => setPassword(e.target.value)}
                        onPasswordValidation={(isValid) => setPasswordValid(isValid)}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Confirmă parola"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 3,
                            backgroundColor: '#000000',
                            '&:hover': { backgroundColor: '#9F9F9F' },
                            borderRadius: '10px',
                        }}
                    >
                        Înregistrare
                    </Button>
                </form>
                <Link to="/login" sx={{ textDecoration: 'none', mt: 2 }}>
                    <Typography variant="body2" align="center" marginTop="1rem">
                        Ai deja un cont? Autentificare
                    </Typography>
                </Link>
            </Box>
        </Container>
        </>
    );
};

export default RegisterPage;