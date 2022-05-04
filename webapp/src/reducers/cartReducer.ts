import { addCart } from "../api/api";
import { CartReducerAction, CartProduct } from "../shared/shareddtypes";


const cartReducer = (state: CartProduct[], action: CartReducerAction) => {

    const isTheSameProduct = (item: CartProduct) =>{
        return item._id === action.payload._id && item.size === action.payload.size
    }

    const refreshOrderList = async () => {
        await addCart(action.payload);
    }

    switch (action.type) {
        case 'ADD':
            console.log(state)
            // Dos casos: carrito vacío, carrito con elemento
            const existProduct = state.find(item => isTheSameProduct(item));
            if (existProduct) {
                return state.map(item => {
                    if (isTheSameProduct(item)) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                })
            } else {
                refreshOrderList();
                const {name, price, size, image, _id} = action.payload
                return [...state, { name, price, size, quantity: 1, image, _id }]
            }
        case 'REMOVE':
            return state.reduce((acum, item) => {
                if (isTheSameProduct(item)) {
                    if (item.quantity === 1) return acum;
                    else return [...acum, { ...item, quantity: item.quantity - 1 }]
                }
                return [...acum, item]

            }, [] as CartProduct[])
        case 'REMOVE-ALL':// Eliminar un producto del carrito
            return state.filter(item => !isTheSameProduct(item))
        case 'CLEAR':// Vaciar el carrito
            return []
        default:
            return state;
    }


}

export default cartReducer;