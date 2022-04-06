import { CartProduct, CartReducerAction } from "../shared/shareddtypes";
import cartReducer from "./cartReducer";


test('add a product that does not previously exist in the cart', () => {
    //arrange
    const initialState: CartProduct[] = []

    const toAddProduct = {
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 0,
        image: "imagen1",
        _id: "imagen1"
    }

    const action: CartReducerAction = {
        payload: toAddProduct,
        type: 'ADD'
    }

    const expectedState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 1,
        image: "imagen1",
        _id: "imagen1"
    }]

    //act and assert
    expect(cartReducer(initialState, action)).toEqual(expectedState);
})

test('add a product that previously exists in the cart with same size', () => {
    //arrange
    const initialState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 1,
        image: "imagen1",
        _id: "imagen1"
    }]

    const toAddProduct = {
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 0,
        image: "imagen1",
        _id: "imagen1"
    }

    const action: CartReducerAction = {
        payload: toAddProduct,
        type: 'ADD'
    }

    const expectedState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 2,
        image: "imagen1",
        _id: "imagen1"
    }]
    //act and assert
    expect(cartReducer(initialState, action)).toEqual(expectedState);
})

// Creo que no afecta
test('add a product that previously exists in the cart with different size', () => {
    //arrange
    const initialState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 1,
        image: "imagen1",
        _id: "imagen1"
    }]

    const toAddProduct = {
        name: "Producto 1",
        price: 2.5,
        size: 27,
        quantity: 0,
        image: "imagen1",
        _id: "imagen1"
    }

    const action: CartReducerAction = {
        payload: toAddProduct,
        type: 'ADD'
    }

    const expectedState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 1,
        image: "imagen1",
        _id: "imagen1"
    },
    {
        name: "Producto 1",
        price: 2.5,
        size: 27,
        quantity: 1,
        image: "imagen1",
        _id: "imagen1"
    }]
    //act and assert
    expect(cartReducer(initialState, action)).toEqual(expectedState);
})

test('delete a certain product a unit', () => {
    //arrange
    const initialState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 2,
        image: "imagen1",
        _id: "imagen1"
    }]

    const toRemoveProduct = {
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 0,
        image: "imagen1",
        _id: "imagen1"
    }

    const action: CartReducerAction = {
        payload: toRemoveProduct,
        type: 'REMOVE'
    }

    const expectedState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 1,
        image: "imagen1",
        _id: "imagen1"
    }]
    //act and assert
    expect(cartReducer(initialState, action)).toEqual(expectedState);
})

test('delete a certain product with a unit', () => {
    //arrange
    const initialState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 1,
        image: "imagen1",
        _id: "imagen1"
    }]

    const toRemoveProduct = {
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 0,
        image: "imagen1",
        _id: "imagen1"
    }

    const action: CartReducerAction = {
        payload: toRemoveProduct,
        type: 'REMOVE'
    }

    const expectedState: CartProduct[] = []
    //act and assert
    expect(cartReducer(initialState, action)).toEqual(expectedState);
})

test('delete all units of a product', () => {
    //arrange
    const initialState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 2,
        image: "imagen1",
        _id: "imagen1"
    }]

    const toRemoveAllProduct = {
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 0,
        image: "imagen1",
        _id: "imagen1"
    }

    const action: CartReducerAction = {
        payload: toRemoveAllProduct,
        type: 'REMOVE-ALL'
    }

    const expectedState: CartProduct[] = []

    //act and assert
    expect(cartReducer(initialState, action)).toEqual(expectedState);
})

test('delete all products in cart', () => {
    //arrange
    const initialState: CartProduct[] = [{
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 2,
        image: "imagen1",
        _id: "imagen1"
    },
    {
        name: "Producto 2",
        price: 5.5,
        size: 28,
        quantity: 5,
        image: "imagen2",
        _id: "imagen2"
    }]

    /*No hace falta el producto, pero como no esta actualizado el master con 
    una de mi rama donde hice un cambio para ello*/
    const toRemoveAllProduct = {
        name: "Producto 1",
        price: 2.5,
        size: 26,
        quantity: 0,
        image: "imagen1",
        _id: "imagen1"
    }

    const action: CartReducerAction = {
        payload: toRemoveAllProduct,
        type: 'CLEAR'
    }

    const expectedState: CartProduct[] = []
    
    //act and assert
    expect(cartReducer(initialState, action)).toEqual(expectedState);
})