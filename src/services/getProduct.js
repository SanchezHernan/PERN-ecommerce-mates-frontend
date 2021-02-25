import { API_URL } from "./settings";

export default async function getProduct({prodId}) {
    const response = await fetch(`${API_URL}/producto/${prodId}`)
    const jsonData = await response.json(); 
    return(jsonData[0]);
}