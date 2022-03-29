import React, { useState, useEffect, useContext } from 'react'
import { Order } from '../../shared/shareddtypes'
import { getOrders } from '../../api/api'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import OrderItem from './OrderItem'
import { CartContext } from '../../contexts/CartContext'

function OrderList() {
  const [orders, setOrders] = useState<Order[]>([])

  const refreshOrderList = async () => {
    setOrders(await getOrders())
  }

  useEffect(() => {
    refreshOrderList()
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }} mt={2}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {orders.map((order) => {
          return <OrderItem order={order} />
        })}
      </Grid>
    </Box>
  )
}

export default OrderList
