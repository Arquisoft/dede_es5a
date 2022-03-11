import React, { useState, useEffect, useContext} from 'react'
import { Product } from '../../shared/shareddtypes'
import { getProducts } from '../../api/api'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ProductCard from './ProductCard'
import {CartContext} from '../../contexts/CartContext'

function ProductList() {
  const {dispatch} = useContext(CartContext)
  const [products, setProducts] = useState<Product[]>([])

  const handleAddToCart = (product:Product) => {
    dispatch({
      payload: product,
      type: 'ADD'
    })
  }

  const refreshProductList = async () => {
    setProducts(await getProducts())
  }

  useEffect(() => {
    refreshProductList()
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }} mt={2}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {products.map((product) => {
          return <ProductCard product={product} handleAddToCart={handleAddToCart}/>
        })}
      </Grid>
    </Box>
  )
}

export default ProductList
