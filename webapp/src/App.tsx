
import './App.css';
import Footer from './components/Footer';

import ProductList from './components/Products/ProductList';
import UserLogin from './components/User/UserLogIn';
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogIn from './components/User/UserLogIn';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';
import { Container } from '@mui/material';

function App(): JSX.Element {
  return (
  <div className='App'>
    <Router>
      <Navbar/>
      <Container maxWidth="lg">
        <main> 
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/products" element={<ProductList />}/>
            <Route path="/signIn" element={<UserLogIn />}/>
          </Routes>
        </main>
      </Container>
      <Footer/>
    </Router>
  </div>
  );
}

export default App;
