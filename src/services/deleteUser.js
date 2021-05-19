import {API_URL} from './settings'

export default async function deleteUser(email){
    await fetch(`${API_URL}/usuario/carritoActual/${email}`, {
        method: 'DELETE'
    })
    await fetch(`${API_URL}/usuario/${email}`, {
        method: 'DELETE'
    })
}