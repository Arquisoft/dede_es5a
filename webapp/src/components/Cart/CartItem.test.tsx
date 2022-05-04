import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react';
import { CartContext, CartProvider } from '../../contexts/CartContext';
import cartReducer from '../../reducers/cartReducer';
import { CartProduct } from '../../shared/shareddtypes'
import CartItem from './CartItem'

// Arrange
const product: CartProduct = {
  _id: '1234',
  name: 'Blue',
  price: 5,
  size: '40',
  quantity: 45,
  image: ''
}

test('check cart item renders propertly', async () => {
  // Act
  render(<CartProvider><CartItem key={product._id} product={product} /></CartProvider>)

  // Assert
  expect(screen.getByText(product.name)).toBeInTheDocument()
  expect(screen.getByText("Size " + product.size)).toBeInTheDocument()
  expect(screen.getByText(product.price + " €")).toBeInTheDocument()
  expect(screen.getByText(product.quantity)).toBeInTheDocument()
})

test('add a unit of product while inside the cart', async () => {
  // Act
  render(<CartProvider><CartItem key={product._id} product={product} /></CartProvider>)
  
  // add
  let addButton = screen.getByRole('button', {
    name: 'add'
  })
  fireEvent.click(addButton);

  // Assert
  expect(screen.getByText(product.name)).toBeInTheDocument()
  expect(screen.getByText("Size " + product.size)).toBeInTheDocument()
  expect(screen.getByText(product.price + " €")).toBeInTheDocument()
  waitFor(() => {
    expect(product.price + 1).toBeInTheDocument()
  })
})

test('remove a unit of product while inside the cart', async () => {
  // Act
  render(<CartProvider><CartItem key={product._id} product={product} /></CartProvider>)
  
  // remove
  let removeButton = screen.getByRole('button', {
    name: 'remove'
  })
  fireEvent.click(removeButton);

  // Assert
  expect(screen.getByText(product.name)).toBeInTheDocument()
  expect(screen.getByText("Size " + product.size)).toBeInTheDocument()
  expect(screen.getByText(product.price + " €")).toBeInTheDocument()
  waitFor(() => {
    expect(product.price - 1).toBeInTheDocument()
  })
})

test('remove all units of a product while inside the cart', async () => {
  // Act
  render(<CartProvider><CartItem key={product._id} product={product} /></CartProvider>)

  // remove all
  let removeAllButton = screen.getByRole('button', {
    name: 'removeAll'
  })
  fireEvent.click(removeAllButton);

  // Assert
  waitFor(() => {
    expect(screen.getByText(product.name)).not.toBeInTheDocument()
  });
})