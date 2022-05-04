import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'
import { CartProduct } from '../../shared/shareddtypes'

import ShoppingCartDrawer from './ShoppingCartDrawer'

test('check empty shopping cart drawer renders propertly', async () => {
  // Arrange

  // Act
  render(<BrowserRouter><ShoppingCartDrawer /></BrowserRouter>)

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

test('check no empty shopping cart drawer renders cart propertly: log in option', async () => {
  // Arrange
  arrange()

  // go log in page
  let loginButton = screen.getByText("Log in");
  fireEvent.click(loginButton);

  waitFor(() =>
    expect(screen.getByText(/WELCOME/i)).toBeInTheDocument()
  )
})

test('check no empty shopping cart drawer renders cart propertly: cancel option', async () => {
  arrange();

  // select cancel option
  let cancelButton = screen.getByText("Cancel");
  fireEvent.click(cancelButton);

  waitFor(() =>
    expect(screen.getByRole('button', {
      name: /shoppingCart/i
    })).toBeInTheDocument()
  )
})

function arrange() {
  let cartProducts: CartProduct[] = [{
    "name": "nombre",
    "price": 30,
    "size": "37",
    "quantity": 5,
    "image": "hola.jpg",
    "_id": "1"
  }]
  let dispatch = jest.fn()
  render(<CartContext.Provider value={{ cartProducts, dispatch }}><BrowserRouter><ShoppingCartDrawer /></BrowserRouter></CartContext.Provider>)

  // open cart
  let cartButton = screen.getByRole('button', {
    name: /shoppingCart/i
  })
  fireEvent.click(cartButton)
  // Assert
  expect(screen.getByText("My Shopping Cart")).toBeInTheDocument()
  expect(screen.getByText("Total")).toBeInTheDocument()
  waitFor(() => expect(screen.getByText(/150 €/)).toBeInTheDocument()
  )

  // process order
  let processButton = screen.getByText(/Process Order/)
  fireEvent.click(processButton)
  // Assert
  expect(screen.getByText("To continue")).toBeInTheDocument()
  expect(screen.getByText("You need to log in first to process order")).toBeInTheDocument()
  expect(screen.getByText("Cancel")).toBeInTheDocument()
}