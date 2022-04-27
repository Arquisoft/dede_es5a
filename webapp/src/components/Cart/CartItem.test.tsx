import { render, screen } from '@testing-library/react'
import { CartProduct, Order } from '../../shared/shareddtypes'
import CartItem from './CartItem'

test('check order renders propertly', async () => {
  // Arrange
  const product: CartProduct = {
    _id: '1234',
    name: 'Blue',
    price: 5,
    size: 40,
    quantity: 45,
    image: ''
  }

  // Act
  render(<CartItem key={product._id} product={product} />)

  // Assert
  expect(screen.getByText(product.name)).toBeInTheDocument()
  expect(screen.getByText("Size " + product.size)).toBeInTheDocument()
  expect(screen.getByText(product.price + " €")).toBeInTheDocument()
  expect(screen.getByText(product.quantity)).toBeInTheDocument()
})
