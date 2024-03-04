import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FilmAutocomplete from '../atoms/FilmAutocomplete';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase_config';





const pages = [' Listă Componente', 'Consruiește Calculator'];
const settings = ['Profile', 'Login', 'Logout'];

const NavBar = ({ onFilterChange }) => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);




    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const deleteAllCookies = () => {
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    }


    const handleNavigation = (path) => () => {
        if (path === 'Login') {
            navigate("/login");
        } else if (path === 'Logout') {
            //teAllCookies();
            signOut(auth);
            navigate("/home");
        } else if (path === 'Adaugă Anunț') {
            navigate("/add");
        }
        else if (path === 'home') {
            navigate("/home");
        }
        else if (path === 'Postările mele') {
            navigate("/Postarile_mele");

        } else if (path === 'Adaugă o postare') {
            navigate("/add");
        }
        else {
            setAnchorElNav(null);
        }
        setAnchorElUser(null);
    };


    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: 'rgba(34, 95, 191, 0.9)', // schimbați culoarea de fundal
                }}
            >
                <Container maxWidth={false}>
                    <Toolbar disableGutters>
                        <img
                            src="../../public/pc.png"
                            alt="Logo"
                            style={{
                                height: '50px', // specificați o înălțime
                                width: 'auto', // pentru a menține proporțiile
                                margin: '0.5rem',
                                display: { xs: 'flex', md: 'flex' }, // logo-ul va fi afișat pe toate dimensiunile de ecran
                                justifyContent: 'center', // centrat pe mobil
                            }}
                        />

                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={handleNavigation('home')}
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.1rem', // Ajustat pentru a fi mai puțin spațiat decât monospace.
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            BuildBuddy
                        </Typography>


                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}// detecteaza cand se da click pe un element din afara meniului
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleNavigation(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            onClick={handleNavigation('home')}
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            BuildBuddy
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleNavigation(page)}
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        display: 'block',
                                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                                        fontWeight: 700,
                                        letterSpacing: '.1rem',
                                        textTransform: 'none',
                                        // Aici începe stilizarea pentru hover
                                        '&:hover': {
                                            backgroundColor: 'transparent', // sau orice culoare dorită
                                            borderColor: 'white', // culoarea conturului
                                            borderWidth: 2, // grosimea conturului
                                            borderStyle: 'solid', // stilul conturului
                                            boxShadow: '0 0 10px #fff', // adaugă un mic efect de umbra dacă este necesar
                                        },
                                        // sfârșitul stilizării pentru hover
                                    }}
                                >
                                    {page}
                                </Button>


                            ))}
                            <Box sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                backgroundColor: 'rgba(250, 250, 250, 0.8)',
                                justifyContent: 'flex-start', // centrați conținutul
                                alignItems: 'flex-end', // centrați conținutul
                                borderRadius: '7px', // rotunjirea colțurilor
                                maxWidth: '500px', // limitați lățimea maximă
                                minWidth: '300px', // limitați lățimea minimă
                                margin: '0 auto', // centrați conținutul
                                marginTop: '20px', // adaugă spațiu în partea de sus
                                marginBottom: '20px', // adaugă spațiu în partea de jos
                            }}>
                                <FilmAutocomplete
                                    id="film-autocomplete-desktop"
                                    onChange={(event, newValue) => {
                                        try {
                                            onFilterChange(newValue)
                                        } catch (error) {
                                            console.log(error)
                                        }
                                    }
                                    } />
                            </Box>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="avatar" src="../../public/logo_adoptie.png" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}// detecteaza cand se da click pe un element din afara meniului
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleNavigation(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
                <Box sx={{
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'center',
                    backgroundColor: 'rgba(250, 250, 250, 0.8)',
                }}>
                    <FilmAutocomplete
                        id="film-autocomplete-mobile"
                        onChange={(event, newValue) => {
                            try {
                                onFilterChange(newValue)
                            } catch (error) {
                                console.log(error)
                            }
                        }
                        } />
                </Box>
            </AppBar >
        </>
    );
};
export default NavBar;