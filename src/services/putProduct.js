import {API_URL} from './settings'

export default async function putProduct(name, stock, price, stockmin, descrip, supplier, type, disc, code){
    const response = await fetch(`${API_URL}/producto/${name}/${stock}/${price}/${stockmin}/${descrip}/${supplier}/${type}/${disc}/${code}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}