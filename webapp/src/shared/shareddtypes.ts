export type User = {
    name:string;
    email:string;
  }

export type Product = {
      name: string, 
      price: number, 
      type: string, 
      brand: string,
      size: number,
      stock: number,
      description: string,
      image: string,
      _id:string
}

export type CartProduct = {
  name: string, 
  price: number, 
  size: number,
  quantity: number,
  image: string,
  _id:string
}

export type CartActionReducer = {
  payload: any, 
  type: 'ADD' | 'REMOVE' | 'REMOVE-ALL'
}

export type CartContextType = {
  cartProducts: CartProduct[],
  dispatch: React.Dispatch<CartActionReducer>
}
