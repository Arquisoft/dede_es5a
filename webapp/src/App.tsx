import './App.css';
import ProductList from './components/Products/ProductList';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar/Navbar';
import Container from '@mui/material/Container';

function App(): JSX.Element {
  return (
    <CartProvider>
      <Navbar />
      <Container maxWidth="lg">
        <ProductList/>
      </Container>
    </CartProvider>
  );
}

export default App;
