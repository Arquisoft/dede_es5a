import { render, screen } from '@testing-library/react'
import PayStepPage from './PayStepPage';

test('check pay step page renders correctly', async () => {
    // Arrange
    let shippingPrice:number = 5;
  
    // Act
    render(<PayStepPage shippingPrice={shippingPrice} />)
  
    // Assert
    expect(screen.getByText("Simulating the filling of payment data")).toBeInTheDocument()
    expect(screen.getByText("Shipping's price: 5.00 €")).toBeInTheDocument()
  })