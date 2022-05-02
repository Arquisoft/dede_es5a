import { Container } from '@mui/material'
import OrderList from './OrderList'

const Orders = () => {
  return (
    <Container maxWidth="lg">
      <OrderList orderList={[]}/>
    </Container>
  )
}

export default Orders
