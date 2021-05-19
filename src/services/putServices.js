import {API_URL} from './settings'

export async function putUserCart(email, cartId){
    const response = await fetch(`${API_URL}/usuario/carritoActual/${email}/${cartId}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}

export async function putCombo(code, name, description, price){
    const response = await fetch(`${API_URL}/combo/${code}/${name}/${description}/${price}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}

export const putProveedor = async (cuit, name, email, tel, city, dir) => {
    const response = await fetch(`${API_URL}/proveedor/${cuit}/${name}/${email}/${tel}/${city}/${dir}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}

export const putSuspendido = async (email, estado) => {
    const response = await fetch(`${API_URL}/usuario/suspendido/${email}/${estado}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}

export const putRol = async (email, rol) => {
    const response = await fetch(`${API_URL}/admin/rol/${email}/${rol}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}

