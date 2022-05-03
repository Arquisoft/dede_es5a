import { User, Login, Order, Address, ShippingPriceResponse, OrderToPlace, CartProduct, ProductOrdered } from '../shared/shareddtypes';
import {Product} from '../shared/shareddtypes';

// export async function addUser(user:User):Promise<boolean>{
//     const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
//     let response = await fetch(apiEndPoint+'/users/add', {
//         method: 'POST',
//         headers: {'Content-Type':'application/json'},
//         body: JSON.stringify({'name':user.name, 'email':user.email})
//       });
//     if (response.status===200)
//       return true;
//     else
//       return false;
// }



export async function getUsers():Promise<User[]>{
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint+'/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function getProducts():Promise<Product[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/products');
  //The objects returned by the api are directly convertible to Product objects
  return response.json()
}

export async function getProductById(id:string):Promise<Product[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/products/'+id);
  //The objects returned by the api are directly convertible to Product objects
  return response.json()
}

export async function getOrders():Promise<Order[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/orders');
  //The objects returned by the api are directly convertible to Product objects
  return response.json()
}

export async function getOrdersByUser(user_id:string):Promise<Order[]>{
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/orders/'+user_id);
  //The objects returned by the api are directly convertible to Product objects
  return response.json()
}

export async function getShippingPrice(address: Address, distributionCenterId:String):Promise<ShippingPriceResponse>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      { 
        street: address.street, 
        city: address.city, 
        country: address.country,
        zipcode: address.zipcode,
        distributionCenterId: distributionCenterId
      })
  };
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/orders/price', requestOptions);
  return response.json()
}


export async function placeOrder(orderToPlace:OrderToPlace):Promise<number>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderToPlace)
  };
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'
  let response = await fetch(apiEndPoint+'/orders/add', requestOptions);
  await updateProductsStock(orderToPlace.productsOrdered);

  return response.status
}

async function updateProductsStock(productsOrdered:ProductOrdered[]){
  const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000'

  productsOrdered.forEach(async productOrdered => {
    let product = await getProductById(productOrdered.product_id);
    let disponibilities = product[0].disponibility;
    let posSize = undefined;

    for(let i = 0; i < disponibilities.length; i++){

      if((disponibilities[i].size).toString() == productOrdered.size){
        posSize = i;
        break;
      }
    }

    if(posSize != undefined){
      console.log("Producto "+product[0].description +" hay " + product[0].disponibility[posSize].stock)
      product[0].disponibility[posSize].stock -= productOrdered.quantity;
      console.log("Producto "+product[0].description +" decrementa en " + productOrdered.quantity + " unidades")
      
      var {_id , ...productToUpdate} = product[0];
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productToUpdate)
      };
      
      await fetch(apiEndPoint+'/products/update/' + productOrdered.product_id, requestOptions);
    }
  });
}


export async function login(login: Login): Promise<boolean> {
  return login.email === 'prueba@prueba.es' && login.password==='123';
}