import { render, screen } from '@testing-library/react'
import { CartContext} from '../../contexts/CartContext'
import { CartProduct } from '../../shared/shareddtypes'
import ShoppingCart from './ShoppingCart'

test('check empty shopping cart renders propertly', async () => {
  // Arrange

  // Act
  render(<ShoppingCart />)

  // Assert
  expect(screen.getByText("My Shopping Cart")).toBeInTheDocument()
  expect(screen.getByText("No products in cart.")).toBeInTheDocument()
  expect(screen.getByText("Total")).toBeInTheDocument()
  expect(screen.getByText("0 €")).toBeInTheDocument()
})

test('check no empty shopping cart renders propertly', async () => {
    // Arrange
    let cartProducts: CartProduct[] = [{
        "name": "nombre",
        "price": 34,
        "size": "37",
        "quantity": 5,
        "image": "hola.jpg",
        "_id": "1"
        }]
    let dispatch = jest.fn();

    // Act
    render( <CartContext.Provider value={{cartProducts, dispatch}}><ShoppingCart /></CartContext.Provider>)
  
    // Assert
    expect(screen.getByText("My Shopping Cart")).toBeInTheDocument()
    expect(screen.getByText("Total")).toBeInTheDocument()
    expect(screen.getByText("34 €")).toBeInTheDocument()
  })
