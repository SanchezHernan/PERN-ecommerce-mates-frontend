import { API_URL } from "./settings";

export default async function getUser({email}){
    console.log({email});
    const response = await fetch(`${API_URL}/usuarios/${email}`);
    const jsonData = await response.json();
    return(jsonData);
}
