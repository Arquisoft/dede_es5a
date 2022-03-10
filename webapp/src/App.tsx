
import './App.css';

import ProductList from './components/Products/ProductList';
import { CartProvider } from './contexts/CartContext';

function App(): JSX.Element {

  return (
    <CartProvider>
      <ProductList/>
    </CartProvider>
  );
}

export default App;
