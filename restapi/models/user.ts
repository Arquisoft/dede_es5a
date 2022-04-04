// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class User {
    constructor(
        public role: string, 
        public webID: string, 
        public id?: ObjectId) {}
}
