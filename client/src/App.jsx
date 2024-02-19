import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from './context/snackbar.jsx';
import Home_page from './components/pages/HomePage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';

function App() {
  return (
    <Router>
      <SnackbarProvider>
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </SnackbarProvider>
    </Router >
  );
}

export default App;
