import { render, screen } from '@testing-library/react'
import createOrder from './createOrder';
import { CartProduct } from '../shared/shareddtypes';

test('place a order correctly', async () => {
    let cartProducts: CartProduct[] = [
        {
            "name": "nombre1",
            "price": 30,
            "size": "37",
            "quantity": 5,
            "image": "imagen1.jpg",
            "_id": "1"
        },
        {
            "name": "nombre2",
            "price": 10,
            "size": "38",
            "quantity": 10,
            "image": "imagen2.jpg",
            "_id": "2"
        }]
    let shippingPrice = 5;
    let webId = "webIdPrueba";

    let result = createOrder(cartProducts,shippingPrice,webId);
  
    let expectedOrderedProducts = [
        {
            product_id: "1",
            quantity:5,
            size: "37"
            
        },
        {
            product_id: "2",
            quantity:10,
            size: "38"
        }
    ]

    expect(result.productsOrdered).toEqual(expectedOrderedProducts);
    expect(result.shippingPrice).toBe(shippingPrice);
    expect(result.user_id).toBe(webId);
})