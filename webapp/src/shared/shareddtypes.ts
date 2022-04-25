export type User = {
   username: string, 
   webID: string, 
   password: string,
   id: string
  }

export type Product = {
      name: string, 
      price: number, 
      type: string, 
      brand: string,
      disponibility: Array<Disponibility>,
      description: string,
      image: string,
      _id:string
}

export type ProductOrdered = {
  product_id:string,
  size:string,
  quantity:number
}

export type Order = {
  arrivalDate: string,
  confirmDate: string,
  deliveryDate: string,
  totalAmount: number,
  shippingPrice: number,
  productsOrdered: Array<ProductOrdered>,
  user_id: string,
  code: string
}

export type OrderToPlace = {
  arrivalDate: string,
  confirmDate: string,
  totalAmount: number,
  shippingPrice: number,
  productsOrdered: Array<ProductOrdered>,
  user_id: string
}

export interface Login {
  email: string;
  password: string;
}

export type CartProduct = {
  name: string, 
  price: number, 
  size: string,
  quantity: number,
  image: string,
  _id:string
}

export type CartReducerAction = {
  payload: any, 
  type: 'ADD' | 'REMOVE' | 'REMOVE-ALL' | 'CLEAR'
}

export type CartContextType = {
  cartProducts: CartProduct[],
  dispatch: React.Dispatch<CartReducerAction>
}
export type Disponibility = {
  size: number,
  stock: number
}

export type Address = {
  id: number,
  street: string,
  city: string,
  country: string,
  zipcode: string
}

export type ShippingPriceResponse = {
  shippingPrice: number
}
