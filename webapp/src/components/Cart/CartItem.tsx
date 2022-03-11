import React from 'react'
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartProduct } from '../../shared/shareddtypes'
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

type Props = {
    item: CartProduct
}

export default function CartItem({ item }: Props) {
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
                    <p>{item.price}</p>
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
                            <Button disabled>{item.quantity}</Button>
                            <Button>
                                <AddBoxIcon></AddBoxIcon>
                            </Button>
                        </ButtonGroup>
                    </Box>
                </CardActions>
            </Box>
        </Card>
    )
}
