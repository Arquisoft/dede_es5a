import React, { useContext, useState, useEffect } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { CartContext } from '../../contexts/CartContext';
import CartItem from './CartItem';

import {Card, CardMedia, CardContent, CardActions} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from '../../logo.svg';

export default function ShoppingCart() {
    const { cartProducts } = useContext(CartContext)
    const [state, setState] = React.useState(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        setState(open)
    };

    const list = () => (
        <Box >
            <List>
                <h2>Your Shopping Cart</h2>

                {cartProducts.length === 0 ? <p>No items in cart.</p> : null}
                {cartProducts.map(item => (
                    <ListItem>
                        <CartItem key={item._id} item={item} />
                    </ListItem>

                ))}

                <ListItem>
                    <Card>
                        <CardMedia
                            component="img"
                            width="200"
                            image={logo}
                            alt="hola"
                        ></CardMedia>
                        <CardContent>
                            <p>Socks</p>
                        </CardContent>
                        <CardActions>
                            <Button>
                                <RemoveCircleIcon></RemoveCircleIcon>
                            </Button>
                            <Button>
                                <AddBoxIcon></AddBoxIcon>
                            </Button>
                            <Button>
                                <DeleteIcon></DeleteIcon>
                            </Button>
                        </CardActions>
                    </Card>
                </ListItem>
                <ListItem>
                    <Card>
                        <CardMedia
                            component="img"
                            width="200"
                            image={logo}
                            alt="hola"
                        ></CardMedia>
                        <CardContent>
                            <p>Socks</p>
                        </CardContent>
                        <CardActions>
                            <Button>
                                <RemoveCircleIcon></RemoveCircleIcon>
                            </Button>
                            <Button>
                                <AddBoxIcon></AddBoxIcon>
                            </Button>
                            <Button>
                                <DeleteIcon></DeleteIcon>
                            </Button>
                        </CardActions>
                    </Card>
                </ListItem>
                <ListItem>
                    <Card>
                        <CardMedia
                            component="img"
                            width="200"
                            image={logo}
                            alt="hola"
                        ></CardMedia>
                        <CardContent>
                            <p>Socks</p>
                        </CardContent>
                        <CardActions>
                            <Button>
                                <RemoveCircleIcon></RemoveCircleIcon>
                            </Button>
                            <Button>
                                <AddBoxIcon></AddBoxIcon>
                            </Button>
                            <Button>
                                <DeleteIcon></DeleteIcon>
                            </Button>
                        </CardActions>
                    </Card>
                </ListItem>
            </List>
        </Box>
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

                {list()}
                <Divider></Divider>
                <p>Total</p>
                <Button>Continue</Button>
            </Drawer>

        </Box>
    )
}