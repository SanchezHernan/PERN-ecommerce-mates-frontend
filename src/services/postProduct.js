import {API_URL} from './settings'

export default async function postProduct(name, stock, stockmin, price, disc, descrip, supplier, type, img){
    const response = await fetch(`${API_URL}/nuevo/producto/${name}/${stock}/${stockmin}/${price}/${disc}/${descrip}/${supplier}/${type}/${img}`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
}