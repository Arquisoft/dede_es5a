import React, { useContext } from 'react'
import { Card, CardMedia, CardContent, CardActions, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartProduct } from '../../shared/shareddtypes'
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

    /*
    return (
        <Card sx={{ maxWidth: '30em', backgroundColor: '#f7f7f7' }}>
            <Box sx={{ width: '25em', height: '15em'}} >
                <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                <Grid item xs={3}>
                    <CardMedia
                        component="img"
                        width="100%"
                        height="auto"
                        image={item.image}
                        alt={item.name}
                    ></CardMedia>
                </Grid>
                
                    <Grid item xs>
                        <CardContent>
                            <p>{item.name}</p>
                            <p>{item.price * item.quantity} €</p>
                            <p>Size {item.size}</p>
                        </CardContent>
                    </Grid>
                    <Grid item xs>
                        <Button onClick={() => handleRemoveAllFromCart(item)} >
                            <DeleteIcon></DeleteIcon>
                        </Button>
                    </Grid>
                    <Grid item xs>
                        <CardActions>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>

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
                    </Grid>
                </Box>
            </Box >
        </Card >
    )*/
    return (
        <Card sx={{ maxWidth: '30em', backgroundColor: '#f7f7f7' }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridTemplateRows="repeat(4, 1fr)" >
                <Box gridArea="1/1/5/5">
                    <img width="100%" height="auto" src={item.image} alt={item.name}/>
                </Box>
                <Box gridArea="1/6/4/9">
                        <p>{item.name}</p>
                        <p>{item.price * item.quantity} €</p>
                        <p>Size {item.size}</p>
                </Box>
                <Box gridArea="1/11/1/13">
                    <Button onClick={() => handleRemoveAllFromCart(item)} >
                        <DeleteIcon></DeleteIcon>
                    </Button>
                </Box>
                <Box gridArea="4/8/6/11">
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
            </Box>


        </Card >
    )
}
