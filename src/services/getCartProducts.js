import {API_URL} from './settings'

export default async function getCartProducts(cartId){
    const response = await fetch(`${API_URL}/carrito/productos/${cartId}`)
    const jsonData = await response.json();
    return jsonData;
}