import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import ShoppingCartDrawer from './ShoppingCartDrawer'

test('check empty shopping cart drawer renders propertly', async () => {
  // Arrange

  // Act
  render( <BrowserRouter><ShoppingCartDrawer /></BrowserRouter>)

  let cartButton = screen.getByRole('button', {
    name: /shoppingCart/i
  })

  fireEvent.click(cartButton);

  // Assert
  expect(screen.getByText("My Shopping Cart")).toBeInTheDocument()
  expect(screen.getByText("No products in cart.")).toBeInTheDocument()
  expect(screen.getByText("Total")).toBeInTheDocument()
  expect(screen.getByText("0 €")).toBeInTheDocument()
})

