import React, { useContext } from 'react'
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartProduct } from '../../shared/shareddtypes'
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { CartContext } from '../../contexts/CartContext'
import Typography from '@mui/material/Typography';
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
        <Card sx={{ maxWidth: '30em', backgroundColor: '#f7f7f7' }}>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridTemplateRows="repeat(4, 1fr)" >
                <Box gridArea="1/1/5/5">
                    <img width="100%" height="auto" src={item.image} alt={item.name} />
                </Box>
                <Box gridArea="1/5/4/11" sx={{ ml: "0.5em", mr: "0.5em" }}>
                    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
                        <Typography display='inline' variant='h6'>{item.name}</Typography>
                        <Typography display='inline' align='right' variant='subtitle1' color="#787878">{item.quantity == 1 ? '' : item.quantity + 'x'}</Typography>
                        <Typography display='inline' variant='subtitle1'>{item.price} €</Typography>
                    </Box>
                    <Typography variant="subtitle2">Size {item.size}</Typography>
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
                        <Button aria-readonly>{item.quantity}</Button>
                        <Button onClick={() => handleAddToCart(item)}>
                            <AddBoxIcon></AddBoxIcon>
                        </Button>
                    </ButtonGroup>
                </Box>
            </Box>


        </Card >
    )
}
