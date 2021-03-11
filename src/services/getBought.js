import { API_URL } from "./settings";

export default async function getBought(usuario, prodId) {
    const estado = 'FINALIZADO'
    const response = await fetch(`${API_URL}/comprado/producto/${usuario}/${prodId}/${estado}`)
    const jsonData = await response.json(); 
    return(jsonData);
}