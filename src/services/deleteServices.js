import {API_URL} from './settings'

export async function deleteCartProduct(lcod){
    const response = await fetch(`${API_URL}/carrito/producto/${lcod}`, {
        method: 'DELETE'
    })
    const jsonData = await response.json();
    return jsonData;
}

export const deleteProveedor = async(cuit) => {
    const response = await fetch(`${API_URL}/proveedor/${cuit}`, {
        method: 'DELETE'
    })
    const jsonData = await response.json();
    return jsonData;
}

export const deleteVenta = async(code) => {
    const response = await fetch(`${API_URL}/compra/${code}`, {
        method: 'DELETE'
    })
    const jsonData = await response.json();
    return jsonData;
}
