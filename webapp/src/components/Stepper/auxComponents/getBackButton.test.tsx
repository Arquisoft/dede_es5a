import { render, screen, waitFor } from '@testing-library/react'
import getBackButton from "./getBackButton";

test('Activestep is equal to 0, then button is not enabled', async () => {
    // Arrange
    let activeStep = 0;
    let handleBack = () => {};
    // Act
    render(getBackButton(activeStep,handleBack))
  
    // Assert
    expect(screen.getByRole("button")).not.toBeEnabled();
  })

  test('Activestep is equal to 1, then button is enabled', async () => {
    // Arrange
    let activeStep = 1;
    let handleBack = () => {};
    // Act
    render(getBackButton(activeStep,handleBack))
  
    // Assert
    expect(screen.getByText("Back")).toBeEnabled();
  })