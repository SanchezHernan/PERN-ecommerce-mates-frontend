import {API_URL} from './settings'

export default async function postCompra(total, fecha, hora, numtarj, tipotarj, carrito, usuario){
    const response = await fetch(`${API_URL}/comprar/${total}/${fecha}/${hora}/${numtarj}/${tipotarj}/${carrito}/${usuario}`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
}