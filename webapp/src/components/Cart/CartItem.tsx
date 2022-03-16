import React, { useContext } from 'react'
import { Card } from '@mui/material'
import Button from '@mui/material/Button'
import Add from '@mui/icons-material/Add'
import Remove from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import { CartProduct } from '../../shared/shareddtypes'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import { CartContext } from '../../contexts/CartContext'
import Typography from '@mui/material/Typography'

type Props = {
  product: CartProduct
}

export default function CartItem({ product }: Props) {
  const { dispatch } = useContext(CartContext)

  const handleAddToCart = (toAddProduct: CartProduct) => {
    dispatch({
      payload: toAddProduct,
      type: 'ADD',
    })
  }

  const handleRemoveFromCart = (toRemoveProduct: CartProduct) => {
    dispatch({
      payload: toRemoveProduct,
      type: 'REMOVE',
    })
  }

  const handleRemoveAllFromCart = (toRemoveAllQuantityProduct: CartProduct) => {
    dispatch({
      payload: toRemoveAllQuantityProduct,
      type: 'REMOVE-ALL',
    })
  }
  return (
    <Card sx={{ maxWidth: '30em', backgroundColor: '#f7f7f7' }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridTemplateRows="repeat(4, 1fr)"
      >
        <Box gridArea="1/1/5/5">
          <img
            width="100%"
            height="auto"
            src={product.image}
            alt={product.name}
          />
        </Box>
        <Box gridArea="1/5/4/11" sx={{ ml: '0.5em', mr: '0.5em' }}>
          <Box display="grid" gridTemplateColumns="repeat(3, 1fr)">
            <Typography display="inline" variant="h6">
              {product.name}
            </Typography>
            <Typography
              display="inline"
              align="right"
              variant="subtitle1"
              color="#787878"
            >
              {product.quantity == 1 ? '' : product.quantity + 'x'}
            </Typography>
            <Typography display="inline" variant="subtitle1">
              {product.price} €
            </Typography>
          </Box>
          <Typography variant="subtitle2">Size {product.size}</Typography>
        </Box>
        <Box gridArea="1/11/1/13">
          <Button onClick={() => handleRemoveAllFromCart(product)}>
            <DeleteIcon></DeleteIcon>
          </Button>
        </Box>
        <Box gridArea="4/8/6/11">
          <ButtonGroup>
            <Button
              variant="contained"
              onClick={() => handleRemoveFromCart(product)}
            >
              <Remove></Remove>
            </Button>
            <Button variant="contained" aria-readonly>
              {product.quantity}
            </Button>
            <Button
              variant="contained"
              onClick={() => handleAddToCart(product)}
            >
              <Add></Add>
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Card>
  )
}
