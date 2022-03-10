import { createContext, useContext, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";
import { CartContextType } from "../shared/shareddtypes";

const initialState = {
    cartProducts: [],
    dispatch: () => {}
}

export const CartContext = createContext<CartContextType>(initialState);

export const CartProvider = ({ children }: any) => {

    const [cartProducts, dispatch] = useReducer(cartReducer, initialState.cartProducts);

    return (
        <CartContext.Provider value={{ //Poner todos los atributos que queremos que acceden los componentes
            cartProducts,
            dispatch
        }}>
            { children }
        </CartContext.Provider>
    )
}