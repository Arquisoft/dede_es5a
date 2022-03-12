import React, { useContext } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { IconButton, Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import { CartContext } from '../../contexts/CartContext';
import CartItem from './CartItem';
import calculateCartTotal from '../../helpers/calculateCartTotal'
import calculateTotalQuantity from '../../helpers/calculateTotalQuantity'
import Stack from '@mui/material/Stack';
import { Container, Badge } from '@mui/material';
import Typography from '@mui/material/Typography';

export default function ShoppingCart() {
    const { cartProducts } = useContext(CartContext)
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setState(open)
    };


    const list = () => (
        <Stack spacing={2}>
            {cartProducts.map(product => (
                <CartItem key={product._id} product={product} />
            ))}
            <Divider />
        </Stack>
    )

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open cart">
                <Badge badgeContent={calculateTotalQuantity(cartProducts)} color="secondary">
                    <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                        <ShoppingCartIcon fontSize="large" ></ShoppingCartIcon>
                    </IconButton>
                </Badge>
            </Tooltip>
            <Drawer
                anchor={"right"}
                open={state}
                onClose={toggleDrawer(false)}
            >
                <Container>
                    <Box sx={{ mt: "1.25em", mb: "1.25em" }}>
                        <Typography align='center' variant='h5' component='h5'>My Shopping Cart</Typography>
                    </Box>
                    {cartProducts.length === 0 ? <p>No products in cart.</p> : null}
                    {list()}
                    <Box display="grid" gridTemplateColumns="repeat(2, 1fr)">
                        <Typography variant='h6'>Total</Typography>
                        <Typography variant='h6' align='right' >{calculateCartTotal(cartProducts)} €</Typography>
                    </Box >
                    <Box sx={{ mt: "1.25em", mb: "1.25em" }}>
                        <Button fullWidth variant="contained">Continue</Button>
                    </Box>
                </Container>
            </Drawer>
        </Box>
    )
}