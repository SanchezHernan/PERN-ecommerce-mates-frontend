import {API_URL} from './settings'

export default async function getCalificacionExists(prodId, usuario){
    const response = await fetch(`${API_URL}/calificacion/${prodId}/${usuario}`)
    const jsonData = await response.json();
    return jsonData;
}