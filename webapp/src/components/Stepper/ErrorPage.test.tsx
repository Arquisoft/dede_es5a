import { render, screen } from '@testing-library/react'
import ErrorPage from './ErrorPage';

test('check error page renders correctly', async () => {
  // Arrange

  // Act
  render(<ErrorPage />)

  // Assert
  expect(screen.getByText("Oops! Something went wrong. Retry again.")).toBeInTheDocument()
  expect(screen.getByText("Back to Start")).toBeEnabled();
})