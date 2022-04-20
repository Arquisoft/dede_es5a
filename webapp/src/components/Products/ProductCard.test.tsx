import { render, screen } from '@testing-library/react'
import ProductList from './ProductList'
import { CartProduct, Product } from '../../shared/shareddtypes'
import ProductCard from './ProductCard'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'

test('check product cards renders propertly', async () => {
  // Arrange
  const handleAddToCart = (cartProduct: CartProduct) => {
    
  }

  const product: Product = {
    _id: '6228ea24dc1289fc6e1c3b12',
    name: 'British',
    type: 'Medium',
    price: 20,
    brand: 'Silk',
    description: 'Typical British',
    image: 'images/products/British.jpg',
    disponibility: [
      {
        size: 40,
        stock: 5,
      },
      {
        size: 41,
        stock: 2,
      },
      {
        size: 42,
        stock: 1,
      },
      {
        size: 37,
        stock: 5,
      },
    ],
  }

  // Act
  render(
    <ProductCard
      key={product._id}
      product={product}
      handleAddToCart={handleAddToCart}
    />
  )

  // Assert
  expect(screen.getByText(product.name.toUpperCase())).toBeInTheDocument()
})
