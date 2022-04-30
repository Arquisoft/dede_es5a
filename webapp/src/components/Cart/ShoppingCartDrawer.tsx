import {
  Box,
  Tooltip,
  Badge,
  IconButton,
  Container,
  Button,
  styled,
  SwipeableDrawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import calculateTotalQuantity from '../../helpers/calculateTotalQuantity'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useNavigate } from 'react-router-dom'
import ShoppingCart from './ShoppingCart'
import { useSession} from "@inrupt/solid-ui-react";
import CloseIcon from '@mui/icons-material/Close';

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
  const {session} = useSession();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleProcessOrderBtn = () =>{
    
    if(session.info.isLoggedIn){
      toggleDrawer(false)();
      navigate('/saleprocess');
    }else{
      setOpenDialog(true);
    }
  }

  const handleDialogClose = (toLogin:boolean) => {
    setOpenDialog(false)
    toggleDrawer(false)();
    if(toLogin){
      navigate('/signIn');
    }
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
      <SwipeableDrawer anchor={'right'} open={state}  onOpen={toggleDrawer(true)} onClose={toggleDrawer(false)}>
        <Container>
          <Box display="flex" justifyContent="flex-end" >
            <IconButton onClick={toggleDrawer(false)} sx={{ p: 0 }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <ShoppingCart />
          <Button
            disabled={cartProducts.length === 0}
            fullWidth
            variant="contained"
            onClick={handleProcessOrderBtn}
          >
            Process Order
          </Button>

          <Dialog
            open={openDialog}
            onClose={() => {handleDialogClose(false)}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"To continue"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You need to log in first to process order
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
              <Button onClick={() => handleDialogClose(true)} autoFocus>
                Log in
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </SwipeableDrawer>
    </Box>
  )
}
