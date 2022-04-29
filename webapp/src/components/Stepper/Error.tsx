import { Button, Container, Typography } from '@mui/material'
import React, { Component } from 'react'
import { StepperContext } from '../../contexts/StepperContext';

export default function ErrorPage()  {
  const {restart} = React.useContext(StepperContext);
  return(
    <Container>
        <Typography sx={{ mt: 2, mb: 1 }} variant="h6">
            Oops! Something went wrong. Retry again.
        </Typography>
        <Button onClick={restart} variant="contained">Back to Start</Button>
    </Container>
  )
}
