import React, { useState, useEffect } from 'react'
import { Order } from '../../shared/shareddtypes'
import { getOrders } from '../../api/api'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import OrderItem from './OrderItem'
import { useSession } from '@inrupt/solid-ui-react'

function OrderList() {
  const { session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])

  const refreshOrderList = async () => {
    setOrders(await getOrders())
  }

  useEffect(() => {
    refreshOrderList()
  }, [])

  const userOrders = orders.filter((o) => o.user_id === session.info.webId)

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
