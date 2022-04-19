import {CartProduct} from "../shared/shareddtypes";
import calculateCartTotal from "./calculateCartTotal";

test('calculate cart\'s total when there are some products in cart', () => {
  // Arrange
  const cartProducts: CartProduct[] = [
    {
        name: "Producto 1", 
        price: 2.5, 
        size: "26",
        quantity: 5,
        image: "imagen1",
        _id:"imagen1"
    },
    {
        name: "Producto 2", 
        price: 2.5, 
        size: "26",
        quantity: 2,
        image: "imagen1",
        _id:"imagen1"
    }
  ];

  // Act
  let total = calculateCartTotal(cartProducts);

  // Assert
  expect(total).toBe(17.5);
});

test('calculate cart\'s total when there is nothing in cart', () => {
    // Arrange
    const cartProducts: CartProduct[] = [];
  
    // Act
    let total = calculateCartTotal(cartProducts);
  
    // Assert
    expect(total).toBe(0);
});