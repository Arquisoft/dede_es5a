import {
  Stack,
  Divider,
  Box,
  Tooltip,
  Badge,
  IconButton,
  Drawer,
  Container,
  Typography,
  Button,
  styled,
} from '@mui/material'
import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import calculateCartTotal from '../../helpers/calculateCartTotal'
import calculateTotalQuantity from '../../helpers/calculateTotalQuantity'
import CartItem from './CartItem'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "black",
    backgroundColor: "#f29f05"
  }
});

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
