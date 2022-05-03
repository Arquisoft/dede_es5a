import { Button } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  /**
   * Only shows back button where we are not in the first step
   */
   export default function getBackButton(activeStep: number, handleBack: any) {
    if (activeStep !== 0) {
      return (
        <Button
          color="inherit"
          onClick={handleBack}
          sx={{ mr: 1 }}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>)
    } else {
      return (
        <Button
          color="inherit"
          sx={{ mr: 1 }}
          disabled>
        </Button>)
    }
  }