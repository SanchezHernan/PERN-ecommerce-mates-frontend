import {API_URL} from './settings'

export default async function putPurchaseState(compraId, estado){
    const response = await fetch(`${API_URL}/compra/actualizar/${compraId}/${estado}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}