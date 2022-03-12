// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class User {
    constructor(
        public username: string, 
        public webID: string, 
        public password: string,
        public id?: ObjectId) {}
}
