import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './Pages/Home';

const App = () => {
  const [auth, setAuth] = useState(false);
  const location = useLocation();

  return (
    <Box>
      <Header/>
      <Box sx={{background: '#f2f3f8'}}>
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />
        <Route
          path="/"
          element={
            auth ? (
              <Home setAuth={setAuth} />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
            )
          }
        />
      </Routes>
      </Box>
    </Box>
  );
}

export default App;
