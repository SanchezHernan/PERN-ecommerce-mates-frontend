import {API_URL} from './settings'

export default async function getProducts( {option} ) {
    const response = await fetch(`${API_URL}/productos/${option}`)
    const jsonData = await response.json();
    return jsonData;
}