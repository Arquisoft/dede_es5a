import React from 'react'
import { Card, CardMedia, CardContent, CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartProduct } from '../../shared/shareddtypes'

type Props = {
  item: CartProduct
}

export default function CartItem({ item }: Props) {
  return (
    <Card>
      <CardMedia>
        component="img"
        sx={{ width: 151 }}
        image={item.image}
        alt={item.name}
      </CardMedia>
      <CardContent>
        {item.price}
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
  )
}
