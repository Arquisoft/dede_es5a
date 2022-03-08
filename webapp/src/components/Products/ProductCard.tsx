import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Product } from '../../shared/shareddtypes'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Alert, Container, Grid, Snackbar } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  product: Product
}

export default function ImgMediaCard({ product }: Props) {
  const [size, setSize] = React.useState('')
  const disponibility = product.disponibility

  const sizesList = disponibility
    .sort((n1, n2) => n1.size - n2.size)
    .map((s) => <MenuItem value={s.size}>{s.size}</MenuItem>)

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string)
  }

  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <Grid item xs={4}>
      <Card>
        <CardMedia
          component="img"
          alt={product.name + " image can't be loaded"}
          height="200"
          //image={require('/public/images/' + product.name + '.png')}
          image={'/images/socks_' + product.name + '.png'}
        />
        <CardContent>
          <Typography variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography variant="h5" component="div">
            {product.brand}
          </Typography>
          <Typography variant="h6" component="div">
            {product.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h5" component="div">
            {product.price} €
          </Typography>
        </CardContent>
        <CardActions>
          <FormControl size="small" fullWidth>
            <InputLabel id="demo-simple-select-label">Size</InputLabel>
            <Select label="Size" onChange={handleSizeChange}>
              {sizesList}
            </Select>
          </FormControl>
          <Button variant="contained" disabled={!size} onClick={handleClick}>
            <AddShoppingCartIcon></AddShoppingCartIcon>
          </Button>
        </CardActions>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            variant="filled"
            onClose={handleClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            Sock size {size} added to cart!
          </Alert>
        </Snackbar>
      </Card>
    </Grid>
  )
}
