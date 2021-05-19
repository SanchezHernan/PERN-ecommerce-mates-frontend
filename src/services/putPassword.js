import {API_URL} from './settings'

export default async function putPassword(password, email){
    const response = await fetch(`${API_URL}/usuario/password/${password}/${email}`, {
        method: 'PUT',
    })
    const jsonData = await response.json();
    return jsonData;
}