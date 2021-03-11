import {API_URL} from './settings'

export default async function getPurchases(email) {
    const response = await fetch(`${API_URL}/miscompras/${email}`)
    const jsonData = await response.json();
    return jsonData;
}