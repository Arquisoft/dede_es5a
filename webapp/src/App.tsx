import './App.css'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserLogIn from './components/User/UserLogIn'
import Home from './components/Home'
import Navbar from './components/Navbar/Navbar'
import { CartProvider } from './contexts/CartContext'
import Container from '@mui/material/Container'

function App(): JSX.Element {
  return (
    <div className="App">
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
    </div>
  )
}

export default App
