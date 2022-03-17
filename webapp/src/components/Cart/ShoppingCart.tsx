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
  const [state, setState] = React.useState(false)

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    setState(open)
  }

  const list = () => (
    <Stack spacing={2}>
      {cartProducts.map((product) => (
        <CartItem key={product._id} product={product} />
      ))}
      <Divider />
    </Stack>
  )

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open cart">
        <StyledBadge
          badgeContent={calculateTotalQuantity(cartProducts)}
        >
          <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
            <ShoppingCartIcon fontSize="large" style={{ color: 'white' }}></ShoppingCartIcon>
          </IconButton>
        </StyledBadge>
      </Tooltip>
      <Drawer anchor={'right'} open={state} onClose={toggleDrawer(false)}>
        <Container>
          <Box sx={{ mt: '1.25em', mb: '1.25em' }}>
            <Typography align="center" variant="h5" component="h5">
              My Shopping Cart
            </Typography>
          </Box>
          {cartProducts.length === 0 ? <p>No products in cart.</p> : null}
          {list()}
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" align="right">
              {calculateCartTotal(cartProducts)} €
            </Typography>
          </Box>
          <Box sx={{ mt: '1.25em', mb: '1.25em' }}>
            <Button
              disabled={cartProducts.length === 0}
              fullWidth
              variant="contained"
            >
              Continue
            </Button>
          </Box>
        </Container>
      </Drawer>
    </Box>
  )
}
