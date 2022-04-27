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
      <Divider />
    </Stack>
  )

  return (
    <Box>
      <Box sx={{ mt: '1.25em', mb: '1.25em' }}>
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
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6" align="right">
          {calculateCartTotal(cartProducts)} €
        </Typography>
      </Box>
    </Box>
  )
}
