
import './App.css';
import Footer from './components/Footer';

import ProductList from './components/Products/ProductList';
import SignIn from './components/User/SignIn';
import { useState } from 'react';

function App(): JSX.Element {

  const [page, setPage] = useState('signin');

  switch  (page) {
    case 'signin':
      return <SignIn setPage={setPage}></SignIn>;
    case 'products':
      return <ProductList></ProductList>;
    default:
      return <p>Pagina no valida: {page}</p> 
  }
}

export default App;
