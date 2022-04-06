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
  const [shippingPrice, setshippingPrice] = React.useState(-1);

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
    }, 5000);

    if(activeStep == steps.length-1){
      if(checkOrder()){
        handleClearCart();
      }

    }
  };


  function checkOrder(){
    // Que exista productos
    if(cartProducts.length == 0){
      return false;
    }
    // Que tenga una direccion seleccionada
    if(shippingPrice == -1){
      return false
    }
    return true;
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getSelectedShippingPrice(price: number){
    setshippingPrice(price);
    console.log("Precio enviado a stepper ppal "+ price)
  }

  function choosePage() {
    switch (activeStep) {
      case 0:
        return (<Container><ShoppingCart /></Container>);
      case 1:
        return <DirectionStepPage getSelectedShippingPrice = {getSelectedShippingPrice}/>;
      case 2:
        return (<Container>
                  <Typography variant="h6">Simulating the filling of payment data</Typography>
                  <Typography>Order's price: {calculateCartTotal(cartProducts).toFixed(2) + ' €'} </Typography>
                  <Typography>Shipping's price: {shippingPrice.toFixed(2) + ' €'} </Typography>
                  <Typography>Total: {(shippingPrice + calculateCartTotal(cartProducts)).toFixed(2) + ' €'} </Typography>
                </Container>);
      default:
        return <Container>Error</Container>;
    }
  }

  function checkState(){
    switch (activeStep) {
      case 0: 
        return cartProducts.length == 0;
      case 1:
        return false;
      default:
        return false;
    }
  }

  function payProcess(){
    if( query === 'success'){
      return(
        <Typography sx={{ mt: 2, mb: 1 }}>
        The sale has been done and it can proceed with the delivery.
        </Typography>
      )
    }
    return (
    <Fade
      in={query === 'progress'}
      style={{
        transitionDelay: query === 'progress' ? '500ms' : '0ms',
      }}
      unmountOnExit>
      <CircularProgress />
    </Fade>)
  }

  function getTextForNextButton(){
    return activeStep === steps.length - 1 ? 'Pay' : 'Next'
  }

  return (
    <Box sx={{ width: '100%'}} >
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>

        {activeStep ===steps.length ? 
        <Container>
          <Box sx={{ height: 40 }}>
          {payProcess()}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </Container>
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
            {choosePage()}
          <Button onClick={handleNext} disabled={checkState()}>
            {getTextForNextButton()}
          </Button>
        </React.Fragment>
        ) }
      </Box>
    </Box>
  );
}

