import {API_URL} from './settings'

export default async function deleteCartProduct(lcod){
    console.log(lcod)
    const response = await fetch(`${API_URL}/carrito/producto/${lcod}`, {
        method: 'DELETE'
    })
    const jsonData = await response.json();
    return jsonData;
}