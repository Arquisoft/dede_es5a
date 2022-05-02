import { Container, Typography } from '@mui/material'
import React from 'react'
import { CartContext } from '../../contexts/CartContext';
import calculateCartTotal from '../../helpers/calculateCartTotal'

type Props = {
    shippingPrice: number;
}

function PayStepPage(props: Props) {

  const { cartProducts } = React.useContext(CartContext);

  return (
    <Container>
        <Typography variant="h5">Simulating the filling of payment data</Typography>
        <Typography variant="h6">Order's price: {calculateCartTotal(cartProducts).toFixed(2) + ' €'} </Typography>
        <Typography variant="h6" >Shipping's price: {props.shippingPrice.toFixed(2) + ' €'} </Typography>
        <Typography variant="h6" style={{ fontWeight: 600 }}>Total: {(props.shippingPrice + calculateCartTotal(cartProducts)).toFixed(2) + ' €'} </Typography>
    </Container>
  )
}

export default PayStepPage