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
    * Calcula el precio total en base al precio de los productos y las direcciones de envío
    * ¿Nos conectaríamos a SOLID aquí para obtener los datos?
    * ¿Nos conectaríamos con la empresa de distribución y calcularíamos el coste de envío?
    * El resultado se suma a totalAmount
    */
     calculateShipping (){

        //Precio

        //Fechas
        
    }

}


