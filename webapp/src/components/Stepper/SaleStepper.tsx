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


const steps = ['Review cart', 'Select delivery address', 'Pay'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef<number>();
  
  const { dispatch } = React.useContext(CartContext)

  const handleClearCart = () => {
    dispatch({
      payload: undefined,
      type: 'CLEAR'
    })
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
      handleClearCart();
      setQuery('success');
    }, 5000);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function choosePage(pageNumber: number) {
    switch (pageNumber) {
      case 0:
        return (<Container><ShoppingCart /></Container>);
      case 1:
        return <DirectionStepPage/>;
      case 2:
        return 'ooh';
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

