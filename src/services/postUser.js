import {API_URL} from './settings'

export default async function postUser(email, username, password, name, lastname, address, city, tel){
    const response = await fetch(`${API_URL}/crear/usuario/${email}/${username}/${password}/${name}/${lastname}/${address}/${city}/${tel}`, {
        method: 'POST'
    })
    const jsonData = await response.json();
    return jsonData;
}