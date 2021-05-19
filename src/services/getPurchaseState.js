import {API_URL} from './settings'

export default async function getPurchaseState ( cartId ) {
    const response = await fetch(`${API_URL}/compra/estado/${cartId}`)
    const jsonData = await response.json();
    return jsonData;
}