import { CartReducerAction, CartProduct } from "../shared/shareddtypes";


const cartReducer = (state: CartProduct[], action: CartReducerAction) => {
    switch (action.type) {
        case 'ADD':
            console.log(state)
            // Dos casos: carrito vacío, carrito con elemento
            const existProduct = state.find(item => item._id === action.payload._id);
            if (existProduct) {
                return state.map(item => {
                    if (item._id === action.payload._id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                })
            } else {
                const {name, price, size, image, _id} = action.payload
                return [...state, { name, price, size, quantity: 1, image, _id }]
            }
        case 'REMOVE':
            return state.reduce((acum, item) => {
                if (item._id === action.payload._id) {
                    if (item.quantity === 1) return acum;
                    else return [...acum, { ...item, quantity: item.quantity - 1 }]
                }
                return [...acum, item]

            }, [] as CartProduct[])
        case 'REMOVE-ALL':// Eliminar un producto del carrito

            return state.filter(item => item._id !== action.payload._id)
        case 'CLEAR':// Vaciar el carrito
            return []
        default:
            return state;
    }
}

export default cartReducer;