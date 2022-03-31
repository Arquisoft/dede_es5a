import './App.css'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserLogIn from './components/User/UserLogIn'
import Home from './components/Home'
import Navbar from './components/Navbar/Navbar'
import { CartProvider } from './contexts/CartContext'
import Container from '@mui/material/Container'
import { SessionProvider } from "@inrupt/solid-ui-react";
import { useState } from 'react';
import Alert from '@mui/material/Alert'
import { Button, Collapse, IconButton, Stack } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

function App(): JSX.Element {

  const [open, setOpen] = useState(true);

  return (
    <div className="App">
      <SessionProvider sessionId="login">
      <Router>
        <CartProvider>
          <Navbar />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signIn" element={<UserLogIn />} />
            </Routes>
          </Container>
        </CartProvider>
        <Footer />
      </Router>
      </SessionProvider>
    </div>
  )
}

export default App
