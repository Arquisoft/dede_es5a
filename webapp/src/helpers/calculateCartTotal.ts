import { CartProduct } from '../shared/shareddtypes'

export default function calculateCartTotal(cartProducts: CartProduct[]){
    return cartProducts.reduce((accum:number, cartProduct: CartProduct) => accum + (cartProduct.price * cartProduct.quantity), 0)
}
