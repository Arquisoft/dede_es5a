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
      confirmDate: new Date().toISOString(),
      deliveryDate: new Date().toISOString(),
      arrivalDate: addDays(new Date(),3).toISOString(), totalAmount: orderPrice,
      shippingPrice: shippingPrice,
      productsOrdered: productsOrdered,
      user_id: webId === undefined ? "" : webId, //hay que controlar si el usuario esta logeado o no previamente
    }
  }

  function addDays(date:Date, days:number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }