import {API_URL} from './settings'

export default async function putUserCart(email, cartId){
    const response = await fetch(`${API_URL}/usuario/carritoActual/${email}/${cartId}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}