import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Product, CartProduct } from '../../shared/shareddtypes'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Alert, Chip, Grid, Paper, Snackbar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  product: Product
  handleAddToCart: (cartProduct: CartProduct) => void;
}

export default function ImgMediaCard({ product, handleAddToCart }: Props) {
  const [size, setSize] = React.useState('')
  const [available, setAvailable] = React.useState(true)

  const disponibility = product.disponibility

  const sizesList = disponibility
    .sort((n1, n2) => n1.size - n2.size)
    .map((s) => <MenuItem value={s.size}>{s.size}</MenuItem>)

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string)
    var currentSize = disponibility.find((s) => s.size === parseInt(size))

    if (currentSize === undefined) {
      throw new TypeError('The value was promised to always be there!')
    }

    if (currentSize?.stock > 0) {
      setAvailable(true)
    } else {
      setAvailable(false)
    }
  }

  //const checkStock = () => {}

  const [addable, setAddable] = React.useState(false)

  const handleClick = () => {
    const addToCartProduct = {
      name: product.name,
      price: product.price,
      size: parseInt(size),
      quantity: 0,
      image: product.image,
      _id: product._id
    }
    handleAddToCart(addToCartProduct)
    setAddable(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setAddable(false)
  }

  const availabilityLabel = () => {
    if (available) {
      return <CheckCircleIcon color="success" />
    }
    return <CancelIcon style={{ color: 'red' }} />
  }

  return (
    <Grid item xs={4}>
      <Card elevation={3} style={{ backgroundColor: '#1976D2' }}>
        <CardMedia
          component="img"
          alt={product.name + " image can't be loaded"}
          height="250"
          image={product.image}
        />
        <CardContent>
          <Paper elevation={2}>
            <Typography variant="h4" component="div" align="center">
              {product.name.toLocaleUpperCase()}
            </Typography>
          </Paper>

          <Paper elevation={1}>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              {product.brand}
            </Typography>
            <Chip label={product.type} sx={{ m: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ m: 1 }}>
              {product.description}
            </Typography>
            <Typography variant="h6" component="div" sx={{ m: 1 }}>
              Stock {availabilityLabel()}
            </Typography>
          </Paper>
          <Paper>
            <Typography variant="h4" component="div" align="center">
              {product.price} €
            </Typography>
          </Paper>
        </CardContent>
        <Paper sx={{ width: 1 }}>
          <CardActions>
            <FormControl size="small" fullWidth sx={{ m: 1 }}>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select label="Size" onChange={handleSizeChange}>
                {sizesList}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              disabled={!size || !available}
              onClick={handleClick}
              sx={{ m: 1 }}
            >
              <AddShoppingCartIcon></AddShoppingCartIcon>
            </Button>
          </CardActions>
        </Paper>
        <Snackbar open={addable} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {product.name}, size {size} added to cart!
          </Alert>
        </Snackbar>
      </Card>
    </Grid>
  )
}
