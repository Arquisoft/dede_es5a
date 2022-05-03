import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom';
import SaleStepper from './SaleStepper';

jest.mock('../../helpers/createOrder');
jest.mock('../../helpers/userAddress', ()=>(
  
     (webId:string) => Promise.resolve(
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
  useLocation: () => {
    pathname: "localhost:3000/"
  }
}));

test('sale stepper renders correctly', async () => {
  // Act
  render(<BrowserRouter><SaleStepper /></BrowserRouter>)

  // Assert
  await waitFor(() => {
    expect(screen.getByText("Review cart")).toBeInTheDocument()
    expect(screen.getByText("Select delivery address")).toBeInTheDocument()
    expect(screen.getByText("Pay")).toBeInTheDocument()
  })
  
})

