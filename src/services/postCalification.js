import {API_URL} from './settings'

export default async function postCalification(calificacion, fecha, hora, usuario, producto){
    const response = await fetch(`${API_URL}/producto/calificar/${calificacion}/${fecha}/${hora}/${usuario}/${producto}`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
}