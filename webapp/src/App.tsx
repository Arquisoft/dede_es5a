import './App.css'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserLogIn from './components/User/UserLogIn'
import Home from './components/Home'
import Navbar from './components/Navbar/Navbar'
import { CartProvider } from './contexts/CartContext'
import Container from '@mui/material/Container'
import { SessionProvider } from '@inrupt/solid-ui-react'
import Orders from './components/Orders/Orders'
import SaleStepper from './components/Stepper/SaleStepper'

function App(): JSX.Element {

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
                <Route path="/orders" element={<Orders />} />
                <Route path="/saleprocess" element={<SaleStepper />} />
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
