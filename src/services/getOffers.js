import {API_URL} from './settings'

export default async function getOfertas(){
    const response = await fetch(`${API_URL}/ofertas`)
    const jsonData = await response.json();
    return jsonData;
}