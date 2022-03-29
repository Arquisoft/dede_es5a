export type User = {
    name:string;
    email:string;
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
  productsOrdered: Array<ProductOrdered>,
  user: User,
  code: string
}

export interface Login {
  email: string;
  password: string;
}

export type CartProduct = {
  name: string, 
  price: number, 
  size: number,
  quantity: number,
  image: string,
  _id:string
}

export type CartReducerAction = {
  payload: CartProduct, 
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
