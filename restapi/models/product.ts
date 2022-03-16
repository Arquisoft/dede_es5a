// External dependencies
import { ObjectId } from "mongodb";
import { Disponibility } from "../models/disponibility";

// Class Implementation
export default class Product {
    constructor(
        public name: string, 
        public price: number, 
        public type: string, 
        public brand: string,
        public disponibility: Set<Disponibility>, 
        public description: string, 
        public id?: ObjectId) {}
}



