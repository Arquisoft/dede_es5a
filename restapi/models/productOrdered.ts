import { ObjectId } from "mongodb";

export interface ProductOrdered {
    quantity: number, 
    size: number,
    product_id: ObjectId
}
