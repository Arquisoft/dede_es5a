import { render, screen } from '@testing-library/react'
import { Order } from '../../shared/shareddtypes'
import OrderItem from './OrderItem'

test('check order renders propertly', async () => {
  // Arrange
  const order: Order = {
    _id: '1234',
    arrivalDate: '2022-06-21T00:00:00.000Z',
    confirmDate: '2022-04-21T00:00:00.000Z',
    deliveryDate: '2022-03-09T21:17:00.157Z',
    shippingPrice: 1.05,
    totalAmount: 45,
    productsOrdered: [
      { quantity: 2, size: '40', product_id: '6228ea24dc1289fc6e1c3b12' },
    ],
    user_id: 'user1',
    code: 'code1',
  }

  // Act
  render(<OrderItem order={order} key={order.code} />)

  // Assert
  expect(screen.getByText("Arrival: " + new Date(order.arrivalDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Confirmed: " + new Date(order.confirmDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Delivered: " + new Date(order.deliveryDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Shipping price: " + order.shippingPrice + " €")).toBeInTheDocument()
})
