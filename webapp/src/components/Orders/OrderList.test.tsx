import { render, screen } from '@testing-library/react'
import { Order } from '../../shared/shareddtypes'
import OrderList from './OrderList'

test('check that the list of orders renders propertly', async () => {
  // Arrange
  const orderList: Order[] = [
    {
      _id: '1234',
      arrivalDate: '2022-05-04T16:29:33.324+00:00',
      confirmDate: '2022-05-02T16:29:33.324+00:00',
      deliveryDate: '2022-05-03T16:29:33.324+00:00',
      totalAmount: 45,
      shippingPrice: 1.15,
      productsOrdered: [
        { quantity: 2, size: '40', product_id: '6228ea24dc1289fc6e1c3b12' },
      ],
      user_id: 'user1',
      code: 'code1',
    },
    {
      _id: '5678',
      arrivalDate: '2022-05-12T17:29:33.324+00:00',
      confirmDate: '2022-05-10T17:29:33.324+00:00',
      deliveryDate: '2022-05-11T17:29:33.324+00:00',
      totalAmount: 45,
      shippingPrice: 1.25,
      productsOrdered: [
        { quantity: 1, size: '40', product_id: '6228ea24dc1289fc6e1c3b12' },
        { quantity: 1, size: '40', product_id: '6228ea24dc1289fc6e1c3b1b' },
      ],
      user_id: 'user2',
      code: 'code2',
    },
  ]

  // Act
  render(<OrderList orderList={orderList} />)

  // Assert
  expect(screen.getAllByText("Confirmed: " + new Date(orderList[0].confirmDate).toLocaleDateString() + " | "+ new Date(orderList[0].confirmDate).toLocaleTimeString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Arrival: " + new Date(orderList[0].arrivalDate).toLocaleDateString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Delivery: " + new Date(orderList[0].deliveryDate).toLocaleDateString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Products: " + orderList[0].totalAmount.toFixed(2) + " €").at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Shipping: " + orderList[0].shippingPrice.toFixed(2) + " €").at(0)).toBeInTheDocument()
  expect(screen.getAllByText("TOTAL: " + (orderList[0].totalAmount + orderList[0].shippingPrice).toFixed(2) + " €").at(0)).toBeInTheDocument()

  expect(screen.getAllByText("Confirmed: " + new Date(orderList[1].confirmDate).toLocaleDateString() + " | "+ new Date(orderList[1].confirmDate).toLocaleTimeString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Arrival: " + new Date(orderList[1].arrivalDate).toLocaleDateString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Delivery: " + new Date(orderList[1].deliveryDate).toLocaleDateString()).at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Products: " + orderList[1].totalAmount.toFixed(2) + " €").at(0)).toBeInTheDocument()
  expect(screen.getAllByText("Shipping: " + orderList[1].shippingPrice.toFixed(2) + " €").at(0)).toBeInTheDocument()
  expect(screen.getAllByText("TOTAL: " + (orderList[1].totalAmount + orderList[0].shippingPrice).toFixed(2) + " €").at(0)).toBeInTheDocument()

})
