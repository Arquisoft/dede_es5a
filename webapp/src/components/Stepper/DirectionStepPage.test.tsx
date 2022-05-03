import { render, screen } from '@testing-library/react'
import { Address } from '../../shared/shareddtypes'
import DirectionStepPage from './DirectionStepPage';


test('user without addresses', async () => {
  // Arrange
  let getSelectedShippingPrice: (number: number) => void = () => {};// This is intentional
  let addresses: Address[] = [];

  // Act
  render(<DirectionStepPage getSelectedShippingPrice={getSelectedShippingPrice} addresses={addresses} />)

  // Assert
  expect(screen.getByText("Addresses")).toBeInTheDocument()
  expect(screen.getByText("Shipping price: Select an address before")).toBeInTheDocument()
  expect(screen.getByText("You don't have any address in pod.")).toBeInTheDocument()
})

test('user with addresses', async () => {
  // Arrange
  let getSelectedShippingPrice: (number: number) => void = () => {}; // This is intentional
  let addresses: Address[] = [
    { id: 1, 
      street: 'Calle Valdés Salas 1', 
      city: 'Oviedo', 
      country: 'España',
      zipcode: '33007'
    }];

  // Act
  render(<DirectionStepPage getSelectedShippingPrice={getSelectedShippingPrice} addresses={addresses} />)

  // Assert
  expect(screen.getByText("Addresses")).toBeInTheDocument()
  expect(screen.getByText("Shipping price: Select an address before")).toBeInTheDocument()
  expect(screen.getByText("Calle Valdés Salas 1")).toBeInTheDocument()
  expect(screen.getByText("Oviedo")).toBeInTheDocument()
  expect(screen.getByText("España")).toBeInTheDocument()
})