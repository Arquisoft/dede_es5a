import { render, screen } from '@testing-library/react'
import { Address } from '../../shared/shareddtypes'
import DirectionStepPage from './DirectionStepPage';
import SaleStepper from './SaleStepper';


test('sale stepper renders correctly', async () => {
  // Act
  render(<SaleStepper />)

  // Assert
  expect(screen.getByText("Review cart")).toBeInTheDocument()
  expect(screen.getByText("Select delivery address")).toBeInTheDocument()
  expect(screen.getByText("Pay")).toBeInTheDocument()
})