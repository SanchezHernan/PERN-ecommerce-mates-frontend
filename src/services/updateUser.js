import {API_URL} from './settings'

export default async function updateUser(nombre, apellido, ciudad, direccion, telefono, email){
    const response = await fetch(`${API_URL}/usuario/actualizar/${nombre}/${apellido}/${ciudad}/${direccion}/${telefono}/${email}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}