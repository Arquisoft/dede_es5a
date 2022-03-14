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

export interface Login {
  email: string;
  password: string;
}

export type Disponibility = {
  size: number,
  stock: number
}