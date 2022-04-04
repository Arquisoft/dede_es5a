import React, { useState, useEffect, useContext } from 'react'
import { Product, CartProduct } from '../../shared/shareddtypes'
import { getProducts } from '../../api/api'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ProductCard from './ProductCard'
import { CartContext } from '../../contexts/CartContext'

type ProductListProps = {
  products: Product[];
}

function ProductList(props: ProductListProps) {
  const { dispatch } = useContext(CartContext)
  const [products, setProducts] = useState<Product[]>(props.products)

  const handleAddToCart = (cartProduct: CartProduct) => {
    dispatch({
      payload: cartProduct,
      type: 'ADD',
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
          return (
            <ProductCard
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          )
        })}
      </Grid>
    </Box>
  )
}

export default ProductList
