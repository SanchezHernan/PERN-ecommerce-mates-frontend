import {API_URL} from './settings'

export async function postCombo(name, price, descrip){
    console.log('llego aqui');
    const response = await fetch(`${API_URL}/nuevo/combo/${name}/${price}/${descrip}`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
}

export async function postComboXProducto(productCode, {codigo}){
    const response = await fetch(`${API_URL}/nuevo/comboxproducto/${productCode}/${codigo}`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
}

export const postProveedor = async(cuit, name, email, tel, city, dir) => {
    const response = await fetch(`${API_URL}/nuevo/proveedor/${cuit}/${name}/${email}/${tel}/${city}/${dir}`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
} 