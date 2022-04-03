// External dependencies
import { ObjectId } from "mongodb";
import { ProductOrdered } from "../models/productOrdered";
import { v4 as uuidv4 } from 'uuid';


// Class Implementation
export default class Order {
    
    public code: string = "";
    public id?: ObjectId;

    constructor(
        public arrivalDate: Date, 
        public confirmDate: Date, 
        public deliveryDate: Date,
        public totalAmount: number,
        public shippingPrice : number,
        public productsOrdered: Set<ProductOrdered>,
        public user_id: ObjectId){}
    
    /**
    * Se calcula el codigo de pedido
    * @param code modificado
    */
    setCode () {
        this.code = uuidv4();
    }

    /**
    * Se añade el coste de envío
    * @param shippingPrice coste envío a añadir
    */
     setShippingPrice ( shippingPrice : number ) {
        this.shippingPrice = shippingPrice;
    }

}


