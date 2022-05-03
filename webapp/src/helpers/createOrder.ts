import { useSession } from "@inrupt/solid-ui-react";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartProduct, ProductOrdered } from "../shared/shareddtypes";
import calculateCartTotal from "./calculateCartTotal";

export default function createOrder(cartProducts: CartProduct[], shippingPrice: number, webId?:string) {

    let orderPrice: number = calculateCartTotal(cartProducts);

    let productsOrdered: ProductOrdered[] = [];

    cartProducts.forEach((product: CartProduct) => {
      productsOrdered.push({
        product_id: product._id,
        quantity: product.quantity,
        size: product.size
      })
    });

    return {
      arrivalDate: "2022-04-11T00:00:00.000Z",
      confirmDate: "2022-04-08T00:00:00.000Z",
      totalAmount: orderPrice,
      shippingPrice: shippingPrice,
      productsOrdered: productsOrdered,
      user_id: webId === undefined ? "" : webId, //hay que controlar si el usuario esta logeado o no previamente
    }
  }