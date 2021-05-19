import { API_URL } from "./settings";

export default async function getProdCalificable(prodId, usuario) {
    const response = await fetch(`${API_URL}/producto/calificable/${prodId}/${usuario}`)
    const jsonData = await response.json(); 
    return(jsonData);
}