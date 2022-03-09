// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class User {
    constructor(
        public username: string, 
        public webID: String, 
        public password: string,
        public id?: ObjectId) {}
}
