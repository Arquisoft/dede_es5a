import { Grid, Card, CardContent, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getProducts } from '../../api/api'
import { Order, Product } from '../../shared/shareddtypes'

interface Props {
  order: Order
}

export default function OrderItem({ order }: Props) {
  const [products, setProducts] = useState<Product[]>([])

  const refreshProductList = async () => {
    setProducts(await getProducts())
  }

  useEffect(() => {
    refreshProductList()
  }, [])

  const productsPaperList = order.productsOrdered.map((p) => {
    const prod = products.find((p2) => p2._id === p.product_id)

    return (
      <Paper sx={{ margin: 1.2 }} key={order.code + p.product_id}>
        <Typography variant="h5">
          {prod?.name} - {prod?.brand}
        </Typography>
        <Typography variant="h6">
          Size: {p.size}, Quantity: {p.quantity}
        </Typography>
      </Paper>
    )
  })

  return (
    <Grid item xs={12}>
      <Card
        elevation={3}
        style={{ backgroundColor: '#365073', borderColor: '#365073' }}
        sx={{ border: 5 }}
      >
        <CardContent sx={{ textAlign: 'left' }}>
          <Paper elevation={2}>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              Confirmed: {new Date(order.confirmDate).toLocaleDateString()} | {new Date(order.confirmDate).toLocaleTimeString()}
            </Typography>

          </Paper>
          <Paper elevation={1}>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
            </Typography>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              Arrival: {new Date(order.arrivalDate).toLocaleDateString()}
            </Typography>
          </Paper>
          {/* {productsPaperList} */}
          <Paper elevation={2}>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              Products: {order.totalAmount.toFixed(2)} €
            </Typography>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              Shipping: {order.shippingPrice.toFixed(2)} €
            </Typography>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              TOTAL: {(order.totalAmount + order.shippingPrice).toFixed(2)} €
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </Grid>
  )
}