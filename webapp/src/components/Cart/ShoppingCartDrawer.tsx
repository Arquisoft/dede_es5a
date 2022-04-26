import {
  Box,
  Tooltip,
  Badge,
  IconButton,
  Drawer,
  Container,
  Button,
  styled,
} from '@mui/material'
import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import calculateTotalQuantity from '../../helpers/calculateTotalQuantity'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "black",
    backgroundColor: "#f29f05"
  }
});



export default function ShoppingCartDrawer() {
  const { cartProducts } = useContext(CartContext)
  const [state, setState] = React.useState(false)
  const navigate = useNavigate()
  const toggleDrawer = (open: boolean) => () => {
    setState(open)
  }

  const handleProcessOrderBtn = () =>{
    toggleDrawer(false)();
    navigate('/saleprocess');
  }

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
          <ShoppingCart />
        
            <Button
              disabled={cartProducts.length === 0}
              fullWidth
              variant="contained"
              onClick={handleProcessOrderBtn}
            >
              Process Order
            </Button>
        </Container>
      </Drawer>
    </Box>
    
  )
}
