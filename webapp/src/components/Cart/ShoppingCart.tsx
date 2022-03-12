import React, { useContext } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { CartContext } from '../../contexts/CartContext';
import CartItem from './CartItem';
import calculateCartTotal from '../../helpers/calculateCartTotal'
import Stack from '@mui/material/Stack';
import { Paper, styled, Container } from '@mui/material';

export default function ShoppingCart() {
    const { cartProducts } = useContext(CartContext)
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setState(open)
    };

    const list = () => (
        <Stack spacing={2}>
            {cartProducts.map(item => (
                <CartItem key={item._id} item={item} />
            ))}
        </Stack>
    )

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open cart">
                <IconButton onClick={toggleDrawer(true)} sx={{ p: 0 }}>
                    <ShoppingCartIcon fontSize="large" ></ShoppingCartIcon>
                </IconButton>
            </Tooltip>
            <Drawer
                anchor={"right"}
                open={state}
                onClose={toggleDrawer(false)}
            >
                <Container>
                    <h2>Your Shopping Cart</h2>
                    {cartProducts.length === 0 ? <p>No items in cart.</p> : null}
                    {list()}
                    <Divider></Divider>
                    <p>Total: {calculateCartTotal(cartProducts)} €</p>
                    <Button>Continue</Button>
                </Container>
            </Drawer>

        </Box>
    )
}