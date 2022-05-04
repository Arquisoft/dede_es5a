import { Container } from '@mui/material';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import { StepperContext } from '../../contexts/StepperContext';
import SaleStepper from './SaleStepper';
jest.mock("./DirectionStepPage", () => () => {
  return <p>DirectionsPage</p>;
});
jest.mock("./PayStepPage", () => () => {
  return <p>PayPage</p>;
});

jest.mock('../../helpers/createOrder');
jest.mock('../../helpers/userAddress', ()=>(
     () => Promise.resolve(
      [
        [
          'street address 1',
          'locality 1',
          'postal code 1',
          'region 1',
          'country name 1'
        ],
        [
          'street address 2',
          'locality 2',
          'postal code 2',
          'region 2',
          'country name 2'
        ]
      ]
    )))
  
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: () => {} // This is intentional
}));

test('sale stepper renders correctly', async () => {
  // Act
  render(<BrowserRouter><SaleStepper /></BrowserRouter>)

  // Assert
  waitFor(() => {
    expect(screen.getByText("Review cart")).toBeInTheDocument()
    expect(screen.getByText("Select delivery address")).toBeInTheDocument()
    expect(screen.getByText("Pay")).toBeInTheDocument()
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument()
  })
})

test('go second page of stepper', async () => {
  // Act
  render(<BrowserRouter><SaleStepper /></BrowserRouter>)

  // next
  let nextButton = screen.getByText(/Next/i)
  fireEvent.click(nextButton);

  // Assert
  waitFor(() => {
    expect(screen.getByText("Addresses")).toBeInTheDocument()
    expect(screen.getByText("Select delivery address")).toBeInTheDocument()
    expect(screen.getByText("Shopping Cart")).not.toBeInTheDocument()
  })
})

test('go third page of stepper', async () => {
  // Act
  render(<BrowserRouter><SaleStepper /></BrowserRouter>)

  // next
  let nex1Button = screen.getByText(/Next/i)
  fireEvent.click(nex1Button);

  let next2Button = screen.getByText(/Next/i)
  fireEvent.click(next2Button);

  // Assert
  waitFor(() => {
    expect(screen.getByText("Pay")).toBeInTheDocument()
    expect(screen.getByText("Shopping Cart")).not.toBeInTheDocument()
    expect(screen.getByText("Addresses")).not.toBeInTheDocument()
    expect(screen.getByText("Simulating the filling of payment data")).toBeInTheDocument()
    
  })

  let next3Button = screen.getByText(/Pay/i)
  fireEvent.click(next3Button);

  waitFor(() => {
    expect(screen.getByText("Pay")).toBeInTheDocument()
    expect(screen.getByText("Shopping Cart")).not.toBeInTheDocument()
    expect(screen.getByText("Addresses")).not.toBeInTheDocument()
    expect(screen.getByText("Simulating the filling of payment data")).toBeInTheDocument()
    expect(screen.getByText("Oops! Something went wrong. Retry again.")).not.toBeInTheDocument()
  })
})

test('second page of stepper renders correctly', async () => {
  // Arrange
  let activeStep = 1;
  let stepperDispatch = jest.fn();
  let handleNext = jest.fn();
  let handleBack = jest.fn();
  let restart = jest.fn();

  // Act
  render(<StepperContext.Provider value={{ activeStep,
      stepperDispatch,
      handleNext,
      handleBack,
      restart}}>
      <BrowserRouter>
        <SaleStepper />
      </BrowserRouter>
    </StepperContext.Provider>)

  // Assert
  waitFor(() => {
    expect(screen.getByText("Pay")).toBeInTheDocument()
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument()
    expect(screen.getByText("Addresses")).not.toBeInTheDocument()
    expect(screen.getByText("Simulating the filling of payment data")).not.toBeInTheDocument()
    expect(screen.getByText("DirectionsPage")).toBeInTheDocument()
  })
})

test('third page of stepper renders correctly', async () => {
  // Arrange
  let activeStep = 1;
  let stepperDispatch = jest.fn();
  let handleNext = jest.fn();
  let handleBack = jest.fn();
  let restart = jest.fn();

  // Act
  render(<StepperContext.Provider value={{ activeStep,
      stepperDispatch,
      handleNext,
      handleBack,
      restart}}>
      <BrowserRouter>
        <SaleStepper />
      </BrowserRouter>
    </StepperContext.Provider>)

  // Assert
  waitFor(() => {
    expect(screen.getByText("Pay")).toBeInTheDocument()
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument()
    expect(screen.getByText("Addresses")).not.toBeInTheDocument()
    expect(screen.getByText("Simulating the filling of payment data")).not.toBeInTheDocument()
    expect(screen.getByText("PayPage")).toBeInTheDocument()
  })
})

test('error page of stepper renders correctly', async () => {
  // Arrange
  let activeStep = 4;
  let stepperDispatch = jest.fn();
  let handleNext = jest.fn();
  let handleBack = jest.fn();
  let restart = jest.fn();

  // Act
  render(<StepperContext.Provider value={{ activeStep,
      stepperDispatch,
      handleNext,
      handleBack,
      restart}}>
      <BrowserRouter>
        <SaleStepper />
      </BrowserRouter>
    </StepperContext.Provider>)

  // Assert
  waitFor(() => {
    expect(screen.getByText("Oops! Something went wrong. Retry again.")).toBeInTheDocument()
  })
})



