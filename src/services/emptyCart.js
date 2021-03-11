import {API_URL} from './settings'

export default async function emptyCart(cartId){

    const response = await fetch(`${API_URL}/carrito/vaciar/${cartId}`, {
        method: 'DELETE'
    })
    const jsonData = await response.json();
    return jsonData;
}