import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import PasswordCheck from '../molecules/PasswordCheck';
import { useSnackbar } from '../../context/snackbar.jsx';
import '../../Styles/Login.css';
import NavBar from '../organisms/Navbar.jsx';
import { db } from '../../config/firebase_config';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth } from '../../config/firebase_config';
import { createUserWithEmailAndPassword } from 'firebase/auth';


function RegisterPage() {
    const [fullName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordValid, setPasswordValid] = useState(false);
    const { setSeverity, setMessage, showSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(password);
    }, [password]);


    const checkUsernameAndEmailUnique = async (username, email) => {
        const usersRef = collection(db, "Users_info");
        const usernameQuery = query(usersRef, where("username", "==", username));
        const emailQuery = query(usersRef, where("email", "==", email));

        const [usernameSnapshot, emailSnapshot] = await Promise.all([
            getDocs(usernameQuery),
            getDocs(emailQuery)
        ]);

        const isUsernameUnique = usernameSnapshot.empty; // true dacă username-ul nu există
        const isEmailUnique = emailSnapshot.empty; // true dacă email-ul nu există

        return { isUsernameUnique, isEmailUnique };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { isUsernameUnique, isEmailUnique } = await checkUsernameAndEmailUnique(fullName, email);

        if (!isUsernameUnique) {
            setSeverity('error');
            setMessage('Username-ul există deja.');
            showSnackbar();
            return;
        }

        if (!isEmailUnique) {
            setSeverity('error');
            setMessage('Email-ul este deja înregistrat.');
            showSnackbar();
            return;
        }

        if (!isPasswordValid) {
            setSeverity('error');
            setMessage('Parola tebuie să conțină cel puțin o literă mică, o literă mare, o cifră și să aibă cel puțin 8 caractere.');
            showSnackbar();
            return;
        }

        if (password !== confirmPassword) {
            setSeverity('error');
            setMessage('Parolele nu coincid.');
            showSnackbar();
            return;
        }

        try {
            console.log(email, password)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "Users_info", user.uid), {
                username: fullName,
                email: email,
                // ...alte date
            });

            setSeverity('success');
            setMessage('Contul a fost creat cu succes.');
            showSnackbar();

            navigate('/home');
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            setSeverity('error');
            setMessage("A apărut o eroare. Vă rugăm să încercați din nou.");
            showSnackbar();
        }
    };

    return (
        <div className="customBackground">
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
        </div>
    );
};

export default RegisterPage;