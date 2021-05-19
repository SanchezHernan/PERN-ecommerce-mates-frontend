import {API_URL} from './settings'

export async function deleteCombo(codigo){
    
    await fetch(`${API_URL}/combo/${codigo}`, {
        method: 'DELETE'
    })
}

export async function deleteProductoxcombo(producto, combo){
    console.log(producto);
    console.log(combo);
    await fetch(`${API_URL}/productoxcombo/${producto}/${combo}`, {
        method: 'DELETE'
    })
}