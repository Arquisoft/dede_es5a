import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Product } from '../../shared/shareddtypes'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import { Grid } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface Props {
  product: Product
}

export default function ImgMediaCard({ product }: Props) {
  const [size, setSize] = React.useState('')

  const handleSizeChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string)
  }

  return (
    <Grid item xs={3} minWidth="200">
      <Card>
        <CardMedia
          component="img"
          alt={product.name}
          height="200"
          width="200"
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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="1"
              label="Size"
              onChange={handleSizeChange}
            >
              <MenuItem value={1}>35-40</MenuItem>
              <MenuItem value={2}>40-45</MenuItem>
              <MenuItem value={3}>45-50</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined">
            <AddShoppingCartIcon></AddShoppingCartIcon>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
