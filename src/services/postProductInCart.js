import {API_URL} from './settings'

export default async function postProductInCart({cant, opc, prodId, cartId}){
    const response = await fetch(`${API_URL}/carrito/agregarProducto/${cant}/${opc}/${prodId}/${cartId}`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
}