import { render, screen } from '@testing-library/react'
import { Order } from '../../shared/shareddtypes'
import OrderItem from './OrderItem'

test('check order renders propertly', async () => {
  // Arrange
  const order: Order = {
    _id: '1234',
    arrivalDate: '2022-05-12T17:29:33.324+00:00',
    confirmDate: '2022-05-10T17:29:33.324+00:00',
    deliveryDate: '2022-05-11T17:29:33.324+00:00',
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
  expect(screen.getAllByText("Confirmed: " + new Date(order.confirmDate).toLocaleDateString() + " | " + new Date(order.confirmDate).toLocaleTimeString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Arrival: " + new Date(order.arrivalDate).toLocaleDateString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Delivery: " + new Date(order.deliveryDate).toLocaleDateString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Products: " + order.totalAmount.toFixed(2) + " €").at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Shipping: " + order.shippingPrice.toFixed(2) + " €").at(0)).toBeInTheDocument()
  expect(screen.getAllByText("TOTAL: " + (order.totalAmount + order.shippingPrice).toFixed(2) + " €").at(0)).toBeInTheDocument()

})
