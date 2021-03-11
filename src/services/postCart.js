import {API_URL} from './settings'

export default async function postCart(){
    const response = await fetch(`${API_URL}/carrito/crearCarrito`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
}