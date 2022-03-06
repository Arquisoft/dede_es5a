// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Product {
    constructor(
        public name: string, 
        public price: number, 
        public type: string, 
        public brand: string,
        public size: number,
        public stock: number,
        public description: string, 
        public id?: ObjectId) {}
}
