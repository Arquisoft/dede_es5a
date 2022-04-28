import {
  Stack,
  Divider,
  Box,
  Typography,
} from '@mui/material'
import { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import calculateCartTotal from '../../helpers/calculateCartTotal'
import CartItem from './CartItem'

export default function ShoppingCart() {
  const { cartProducts } = useContext(CartContext)

  const list = () => (
    <Stack spacing={2}>
      {cartProducts.map((product) => (
        <CartItem key={product._id} product={product} />
      ))}
    </Stack>
  )

  return (
    <Box>
      <Box 
      borderBottom={2} 
      borderColor="#365073"
      sx={{ mt: '1.25em', mb: '1.25em' }}>
        <Typography align="center" variant="h5" component="h5">
          My Shopping Cart
        </Typography>
      </Box>
      <Box style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {cartProducts.length === 0 ? <p>No products in cart.</p> : null}
        {list()}
      </Box>
      <Box borderTop={2} 
      sx={{ mt: '1.25em', mb: '1.25em' }}
        borderColor="#365073"
        display="grid" gridTemplateColumns="repeat(2, 1fr)">
        <Typography variant="h6" align="left" >Total</Typography>
        <Typography variant="h5" align="right" style={{ fontWeight: 600 }}>
          {calculateCartTotal(cartProducts)} €
        </Typography>
      </Box>
    </Box>
  )
}
