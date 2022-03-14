import { Container } from '@mui/material'
import React from 'react'
import { CartProvider } from '../contexts/CartContext'
import ProductList from './Products/ProductList'

const Home = () => {
  return (
    <Container maxWidth="lg">
      <ProductList />
    </Container>
  )
}

export default Home
