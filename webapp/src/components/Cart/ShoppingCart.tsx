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

import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from '../../logo.svg';
import ButtonGroup from '@mui/material/ButtonGroup';

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
                        <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                            <CardMedia
                                component="img"
                                width="10"
                                height="50"
                                image={logo}
                                alt="hola"
                            ></CardMedia>
                            <CardContent >
                                <p>Name of Socks</p>
                                <p>37-40</p>
                                <p>2,00€</p>
                            </CardContent>
                            <CardActions>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Button>
                                        <DeleteIcon></DeleteIcon>
                                    </Button>
                                    <ButtonGroup>
                                        <Button>
                                            <RemoveCircleIcon></RemoveCircleIcon>
                                        </Button>
                                        <Button disabled>0</Button>
                                        <Button>
                                            <AddBoxIcon></AddBoxIcon>
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </CardActions>
                        </Box>
                    </Card>
                </ListItem>
                <ListItem>
                    <Card>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                            <CardMedia
                                component="img"
                                width="10"
                                height="50"
                                image={logo}
                                alt="hola"
                            ></CardMedia>
                            <CardContent >
                                <p>Name of Socks</p>
                                <p>37-40</p>
                                <p>2,00€</p>
                            </CardContent>
                            <CardActions>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Button>
                                        <DeleteIcon></DeleteIcon>
                                    </Button>
                                    <ButtonGroup>
                                        <Button>
                                            <RemoveCircleIcon></RemoveCircleIcon>
                                        </Button>
                                        <Button disabled>0</Button>
                                        <Button>
                                            <AddBoxIcon></AddBoxIcon>
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </CardActions>
                        </Box>
                    </Card>
                </ListItem>
                <ListItem>
                    <Card>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                            <CardMedia
                                component="img"
                                width="10"
                                height="50"
                                image={logo}
                                alt="hola"
                            ></CardMedia>
                            <CardContent >
                                <p>Name of Socks</p>
                                <p>37-40</p>
                                <p>2,00€</p>
                            </CardContent>
                            <CardActions>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Button>
                                        <DeleteIcon></DeleteIcon>
                                    </Button>
                                    <ButtonGroup>
                                        <Button>
                                            <RemoveCircleIcon></RemoveCircleIcon>
                                        </Button>
                                        <Button disabled>0</Button>
                                        <Button>
                                            <AddBoxIcon></AddBoxIcon>
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </CardActions>
                        </Box>
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