import './App.css'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserLogIn from './components/User/UserLogIn'
import Home from './components/Home'
import Navbar from './components/Navbar/Navbar'
import { CartProvider } from './contexts/CartContext'
import Container from '@mui/material/Container'
import { SessionProvider } from "@inrupt/solid-ui-react";
import UserDetails from './components/User/UserDetails'
import Orders from './components/Orders/Orders'
import SaleStepper from './components/Stepper/SaleStepper'
import { StepperProvider } from './contexts/StepperContext'

function App(): JSX.Element {
  return (
    <div className="App">
      <SessionProvider sessionId="login">
      <Router>
        <StepperProvider>
        <CartProvider>
          <Navbar />
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signIn" element={<UserLogIn />} />
              <Route path="/profile" element={<UserDetails />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/saleprocess" element={<SaleStepper />} />
            </Routes>
          </Container>
        </CartProvider>
        <Footer />
        </StepperProvider>
      </Router>
      </SessionProvider>
    </div>
  )
}

export default App
