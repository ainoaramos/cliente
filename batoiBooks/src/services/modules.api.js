'use strict'
const API = 'http://localhost:3000';
init();

async function init(){
    const module = prompt('Introduce la id del modulo'); 
    if(!module|| isNaN(module)){
        console.error('Deber introducir una id numerica');
        return;
    }
}

export async function getDBModules() {
    const response = await fetch(API + '/modules/');
    if (!response.ok) {
        throw new Error('Error de servidor: ' + response.status);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
