'use strict'
const API = 'http://localhost:3000';
init();


async function init(){
    const bookId = prompt('Introduce la id del libro'); 
    if(!bookId || isNaN(bookId)){
        console.error('Debes introducir una id numerica');
        return;
    }
}

async function getDBBooks(){
    const response = await fetch(API + '/books/');
    if(!response.ok){
        throw new Error('Error de servidor: ' + response.status);
    }
    const data = await response.json();
    return data;
}

async function getDBBook(id){
    const response = await fetch(API + '/books/' + id);
    if(!response.ok){
        throw new Error ('Error de servidor: ' + response.status);
    }
    const data = await response.json();
    return data;
}



async function addDBBook(book){
    const response = await fetch(API + '/books', {
        method: 'POST',
        body: JSON.stringify(book),
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

async function removeDBBook(id){
    const response = await fetch(API + '/books/' + id,{
        method: 'DELETE'
    })
    if (!response.ok){
        throw new Error ('Error de servidor: ' + response.status);
    }
    return { message: `Libro con ID ${id} eliminado` };
}

async function changeDBBook(book){
    const response = await fetch(API + '/books/' + book.id,{
        method: 'PUT',
        body: JSON.stringify(book),
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



export{
    getDBBooks,
    getDBBook,
    addDBBook,
    removeDBBook,
    changeDBBook
}


