import { render, screen } from '@testing-library/react'
import { Order, Product } from '../../shared/shareddtypes'
import OrderList from './OrderList'

test('check that the list of orders renders propertly', async () => {
  // Arrange
  const orderList: Order[] = [
    {
      _id: '1234',
      arrivalDate: '2022-06-21T00:00:00.000Z',
      confirmDate: '2022-04-21T00:00:00.000Z',
      deliveryDate: '2022-03-09T21:17:00.157Z',
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
      arrivalDate: '2022-06-22T00:00:00.000Z',
      confirmDate: '2022-04-22T00:00:00.000Z',
      deliveryDate: '2022-03-09T21:18:47.042Z',
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
  expect(screen.getByText("Arrival: " + new Date(orderList[0].arrivalDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Confirmed: " + new Date(orderList[0].confirmDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Delivered: " + new Date(orderList[0].deliveryDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Shipping price: " + orderList[0].shippingPrice + " €")).toBeInTheDocument()

  expect(screen.getByText("Arrival: " + new Date(orderList[1].arrivalDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Confirmed: " + new Date(orderList[1].confirmDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Delivered: " + new Date(orderList[1].deliveryDate).toLocaleString())).toBeInTheDocument()
  expect(screen.getByText("Shipping price: " + orderList[1].shippingPrice + " €")).toBeInTheDocument()
})
