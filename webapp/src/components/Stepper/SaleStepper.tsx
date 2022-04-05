import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import ShoppingCart from '../Cart/ShoppingCart';
import { Container, Typography, Fade, CircularProgress } from '@mui/material';
import DirectionStepPage from './DirectionStepPage';
import { CartContext } from '../../contexts/CartContext';
import { useSession } from '@inrupt/solid-ui-react'
import calculateCartTotal from '../../helpers/calculateCartTotal';
import { CartProduct, OrderToPlace, ProductOrdered } from '../../shared/shareddtypes';
import { placeOrder } from '../../api/api';

const steps = ['Review cart', 'Select delivery address', 'Pay'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef<number>();
  
  const { cartProducts, dispatch } = React.useContext(CartContext);
  const { session } = useSession()
  const [shippingPrice, setshippingPrice] = React.useState(999.99);

  function createOrder(){
    let orderPrice: number = calculateCartTotal(cartProducts);

    let productsOrdered:ProductOrdered[]  = [];

    cartProducts.forEach((product:CartProduct) => { 
      productsOrdered.push({product_id: product._id, 
                             quantity: product.quantity,
                             size: product.size
                          })
    });
    console.log("Precio antes de crear el pedido " + shippingPrice)
    return {
      arrivalDate: "2022-04-11T00:00:00.000Z",
      confirmDate: "2022-04-08T00:00:00.000Z",
      totalAmount: orderPrice,
      shippingPrice: shippingPrice,
      productsOrdered: productsOrdered,
      user_id: session.info.webId === undefined? "": session.info.webId, //hay que controlar si el usuario esta logeado o no previamente
    }

  }

  const handleClearCart = async () => {
    let orderToPlace: OrderToPlace = createOrder();
    await placeOrder(orderToPlace).then(res => {
      console.log(res);
      dispatch({
        payload: undefined,
        type: 'CLEAR'
      })
    
    });
  }
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== 'idle') {
      setQuery('idle');
      return;
    }

    setQuery('progress');
    timerRef.current = window.setTimeout(() => {
      setQuery('success');
      handleClearCart();
    }, 5000);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getSelectedShippingPrice(price: number){
    setshippingPrice(price);
    console.log("Precio enviado a stepper ppal "+ price)
  }

  function choosePage(pageNumber: number) {
    switch (pageNumber) {
      case 0:
        return (<Container><ShoppingCart /></Container>);
      case 1:
        return <DirectionStepPage getSelectedShippingPrice = {getSelectedShippingPrice}/>;
      case 2:
        return 'Simulating the filling of payment data';
      default:
        return 'Error';
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

        {activeStep ===steps.length ? 
        <React.Fragment>
                <Box sx={{ height: 40 }}>
        {query === 'success' ? (
           <Typography sx={{ mt: 2, mb: 1 }}>
           All steps completed - you&apos;re finished
           </Typography>
          ) : (
            <Fade
              in={query === 'progress'}
              style={{
                transitionDelay: query === 'progress' ? '500ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          )}
          </Box>
         
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </React.Fragment>
        :
        (
          <React.Fragment>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}>
          Back
        </Button>
          {choosePage(activeStep)}
        <Box sx={{ flex: '1 1 auto' }} />
       
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Pay' : 'Next'}
        </Button>
        </React.Fragment>
        ) }


      </Box>



    </Box>
  );
}

