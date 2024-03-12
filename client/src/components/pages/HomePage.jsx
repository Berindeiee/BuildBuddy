import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavBar from '../organisms/Navbar.jsx';
import { useSnackbar } from '../../context/snackbar.jsx'; // Asigurați-vă că calea este corectă
import { Button } from '@mui/material';
import '../../Styles/Home.css';
import NftCard from '../atoms/Card.jsx';

const Home_page = () => {
  const { setSeverity, setMessage, showSnackbar } = useSnackbar();
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setSeverity('success');
    setMessage('Acesta este un mesaj de snackbar!');
    showSnackbar();
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <NavBar />
      <Box
      sx={{
        backgroundColor: 'grey.100',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        margin: 'auto',
        padding: '20px',
        mx: 'auto',
        gap: '20px',
      
      }}
      >
        <NftCard imageName="cpu" />
        <NftCard imageName="gpu" title='Gpu' description='' />
        <NftCard imageName="cpu" title='Cpu' description='Inima calulatorului tău' />
        <NftCard imageName="cpu" title='Cpu' description='Inima calulatorului tău' />
        <NftCard imageName="cpu" title='Cpu' description='Inima calulatorului tău' />
        <NftCard imageName="cpu" title='Cpu' description='Inima calulatorului tău' />
        <NftCard imageName="cpu" title='Cpu' description='Inima calulatorului tău' />
      </Box>
      <Box sx={{
        marginTop: 4,
        marginBottom: 4,
        mx: 'auto',
        maxWidth: 'lg',
        backgroundColor: 'grey.100',
        borderRadius: 2,
        boxShadow: 1,
        alignContent: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Home Page
        </Typography>
        <Button variant="contained" onClick={handleClick}>
          Arată Snackbar
        </Button>

        {/* Accordion Section */}
        <Box sx={{
          mx: 'auto',
          borderRadius: 2,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Acest lucru va centra acordeoanele pe axa transversală
          justifyContent: 'center', // Centrat pe axa principală, dacă container-ul are înălțime

        }}>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className='accordation'
            sx={{
              backgroundColor: '#9BB0C1',
              boxShadow: 2,
              color: 'white'
            }}>
            <AccordionSummary className='AccordionSummary' expandIcon={<ExpandMoreIcon />} >
              <Typography variant="h6">
                Scopul Aplicației
              </Typography>
            </AccordionSummary>
            <AccordionDetails className='AccordionDetails'>
              <Typography>
                Această aplicație este destinată să vină în ajutorul persoanelor care doresc să aleagă câteva componente pentru a-și asambla propriul calculator.
                Aplicația nu are scop comercial și nu vinde niciun produs, ci doar oferă informații despre produsele disponibile pe piață.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className='accordation'
            sx={{
              backgroundColor: '#9BB0C1',
              boxShadow: 2,
              color: 'white'
            }}>
            <AccordionSummary className='AccordionSummary' expandIcon={<ExpandMoreIcon />} >
              <Typography variant="h6">Ai găsit o eroare?</Typography>
            </AccordionSummary>
            <AccordionDetails className='AccordionDetails'>
              <Typography>
                Dacă ai găsit o eroare în aplicație, te rugăm să ne contactezi pentru a o remedia.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className='accordation'
            sx={{
              backgroundColor: '#9BB0C1',
              boxShadow: 2,
              color: 'white'
            }}>
            <AccordionSummary className='AccordionSummary' expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Our Mission</Typography>
            </AccordionSummary>
            <AccordionDetails className='AccordionDetails'>
              <Typography>
                Descrie misiunea companiei și ce te face unic în piață.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Repetă pentru fiecare secțiune pe care vrei să o adaugi */}
        </Box>
      </Box>
    </>
  );
}

export default Home_page;
