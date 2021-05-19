import { API_URL } from "./settings";

export async function getBought(usuario, prodId, estado) {
    const response = await fetch(`${API_URL}/comprado/producto/${usuario}/${prodId}/${estado}`)
    const jsonData = await response.json(); 
    return(jsonData);
}

export const getProveedores = async() => {
    const response = await fetch(`${API_URL}/proveedores`)
    const jsonData = await response.json()
    return(jsonData)
}

export const getVentas = async() => {
    const response = await fetch(`${API_URL}/ventas`)
    const jsonData = await response.json()
    return(jsonData)
}

export const getVenta = async(cartId) => {
    const response = await fetch(`${API_URL}/venta/${cartId}`)
    const jsonData = await response.json()
    return(jsonData)
}

export const getProveedoresActivos = async() => {
    const response = await fetch(`${API_URL}/proveedores/activos`)
    const jsonData = await response.json()
    return(jsonData)
}

