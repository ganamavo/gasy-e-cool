import React from 'react';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './Pages/Home';
import Products from './Pages/Products';

const App = () => {

  return (
    <Box>
      <Header/>
      <Box sx={{background: '#f2f3f8'}}>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route
          path="/"
          element={<Home/>}
        />
        <Route path="/products" element={<Products/>} />
      </Routes>
      </Box>
    </Box>
  );
}

export default App;
