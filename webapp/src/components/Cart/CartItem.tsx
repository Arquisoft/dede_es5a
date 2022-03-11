import React, { useContext } from 'react'
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartProduct, Product } from '../../shared/shareddtypes'
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { CartContext } from '../../contexts/CartContext'

type Props = {
    item: CartProduct
}

export default function CartItem({ item }: Props) {
    const { dispatch } = useContext(CartContext)

    const handleAddToCart = (item: CartProduct) => {
        dispatch({
            payload: item,
            type: 'ADD'
        })
    }

    const handleRemoveFromCart = (item: CartProduct) => {
        dispatch({
            payload: item,
            type: 'REMOVE'
        })
    }

    const handleRemoveAllFromCart = (item: CartProduct) => {
        dispatch({
            payload: item,
            type: 'REMOVE-ALL'
        })
    }


    return (
        <Card>
            <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                <CardMedia
                    component="img"
                    width="10"
                    height="50"
                    image={item.image}
                    alt={item.name}
                ></CardMedia>
                <CardContent >
                    <p>{item.name}</p>
                    <p>{item.size}</p>
                    <p>{item.price*item.quantity} €</p>
                </CardContent>
                <CardActions>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button onClick={() => handleRemoveAllFromCart(item)}>
                            <DeleteIcon></DeleteIcon>
                        </Button>
                        <ButtonGroup>
                            <Button onClick={() => handleRemoveFromCart(item)}>
                                <RemoveCircleIcon></RemoveCircleIcon>
                            </Button>
                            <Button disabled>{item.quantity}</Button>
                            <Button onClick={() => handleAddToCart(item)}>
                                <AddBoxIcon></AddBoxIcon>
                            </Button>
                    </ButtonGroup>
            </Box>
        </CardActions>
            </Box >
        </Card >
    )
}
