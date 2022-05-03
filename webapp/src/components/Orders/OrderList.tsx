import { useState, useEffect } from 'react'
import { Order } from '../../shared/shareddtypes'
import { getOrders } from '../../api/api'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import OrderItem from './OrderItem'
import { useSession } from '@inrupt/solid-ui-react'

type OrderListProps = {
  orderList: Order[];
}

function OrderList(props: OrderListProps) {
  const { session } = useSession()
  const [orders, setOrders] = useState<Order[]>(props.orderList)

  const refreshOrderList = async () => {
    setOrders(await getOrders())
  }

  useEffect(() => {
    refreshOrderList()
  }, [])

  let userOrders = orders.filter((o) => o.user_id === session.info.webId)

  if(session.info.webId === undefined){
    userOrders = props.orderList
  }

  userOrders.sort((n1, n2) => new Date(n2.confirmDate).getTime() - new Date(n1.confirmDate).getTime())

  return (
    <Box sx={{ flexGrow: 1 }} mt={2}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {userOrders.map((order) => {
          return <OrderItem order={order} key={order.code} />
        })}
      </Grid>
    </Box>
  )
}
export default OrderList
