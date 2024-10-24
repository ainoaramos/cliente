'use strict'
const API = 'http://localhost:3000';
init();

async function init(){
    const userId = prompt('Introduce la id del usuario'); 
    if(!userId || isNaN(userId)){
        console.error('Deber inroducir una id numerica');
        return;
    }
}


async function getDBUsers(){
    const response = await fetch(API + '/users/');
    if(!response.ok){
        throw new Error ('Error de servidor: ' + response.status);
    }
    const data = await response.json();
    return data;
}

async function getDBUser(id){
    const response = await fetch(API + '/users/' + id);
    if(!response.ok){
        throw new Error('Error de servidor: ' + response.status);
    }
    const data = await response.json();
    return data;
}

async function addDBUser(user){
    const response = await fetch(API + '/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    if(!response.ok){
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
    }
    const data = await response.json();
    return data;
}

async function removeDBUser(id){
    const response = await fetch(API + '/users/' + id,{
        method: 'DELETE'
    })
    if (!response.ok){
        throw new Error ('Error de servidor: ' + response.status);
    }
    return { message: `Usuario con ID ${id} eliminado` };
}

async function changeDBUser(user){
    const response = await fetch(API + '/users/' + user.id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error('Error de servidor: ' + response.status); 
    }
    const data = await response.json(); 
    return data;

}

async function changeDBUserPassword(userId, newPassword) {
    const response = await fetch(`${API}/users/${userId}/password`, {
        method: 'PATCH', // Cambia a PATCH
        body: JSON.stringify({ password: newPassword }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Error de servidor: ' + response.status);
    }

    const data = await response.json();
    return data; // Devuelve los datos actualizados
}



export{
    getDBUsers,
    getDBUser,
    addDBUser,
    removeDBUser,
    changeDBUser,
    changeDBUserPassword
}


