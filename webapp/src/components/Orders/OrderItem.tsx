import { Grid, Card, CardContent, Paper, Typography } from '@mui/material'
import { Order } from '../../shared/shareddtypes'

interface Props {
  order: Order
}

export default function ImgMediaCard({ order }: Props) {
  const productsList = order.productsOrdered.map((p) => (
    <Paper sx={{ margin: 1.2 }}>
      <Typography variant="h5">
        Size: {p.size}, Quantity: {p.quantity}
      </Typography>
    </Paper>
  ))

  return (
    <Grid item xs={12}>
      <Card
        elevation={3}
        style={{ backgroundColor: '#365073', borderColor: '#365073' }}
        sx={{ border: 5 }}
      >
        <CardContent sx={{ textAlign: 'left' }}>
          <Paper elevation={2}>
            <Typography variant="h5" component="div" align="center">
              {order.code.toLocaleUpperCase()}
            </Typography>
          </Paper>

          <Paper elevation={1}>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              Confirmed: {new Date(order.confirmDate).toLocaleString()}
            </Typography>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              Delivered: {new Date(order.deliveryDate).toLocaleString()}
            </Typography>
            <Typography variant="h5" component="div" sx={{ m: 1 }}>
              Arrival: {new Date(order.arrivalDate).toLocaleString()}
            </Typography>
          </Paper>
          {productsList}
        </CardContent>
      </Card>
    </Grid>
  )
}
