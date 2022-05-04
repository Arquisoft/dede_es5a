import { createContext, useEffect, useReducer, useState } from "react";
import { getCart } from "../api/api";
import cartReducer from "../reducers/cartReducer";
import { CartContextType, CartProduct} from "../shared/shareddtypes";



let initialState = {
    cartProducts: new Array<CartProduct>(),
    // This is intentional to initialize the function 
    dispatch: () => {}
}

export const CartContext = createContext<CartContextType>(initialState);

export const CartProvider = ({ children }: any) => {

    const [cart, setCart] = useState<CartProduct[]>([]);

    useEffect(() => {
          getCart().then(results => {
            console.log("resultado")
            console.log(results)
            results.push({
                "name": "nombre",
                "price": 34,
                "size": "37",
                "quantity": 5,
                "image": "hola.jpg",
                "_id": "1"
              })
            setCart(results)
            for (let i = 0; i < results.length; i++) {
                console.log(results[i])
                dispatch({
                    payload: results[i],
                    type: 'ADD',
                  })
            }
            getCart().then(result => {
                console.log("Comprobacion")
                console.log(result)
            })
          })
      
      },[]);

    

    const [cartProducts, dispatch] = useReducer(cartReducer, initialState.cartProducts);

    //console.log("carrito recuperado")
    //console.log(cart)
    //console.log("carrito metido")
    //console.log(cartProducts)


    return (
        <CartContext.Provider value={{ //Poner todos los atributos que queremos que acceden los componentes
            cartProducts,
            dispatch
        }}>
            { children }
        </CartContext.Provider>
    )

}