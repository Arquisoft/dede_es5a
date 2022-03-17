import { CartProduct } from '../shared/shareddtypes'

export default function calculateTotalQuantity(cartProducts: CartProduct[]){
    return cartProducts.reduce((accum:number, cartProduct: CartProduct) => accum + cartProduct.quantity, 0)
}