class View{

    constructor(){
        this.booksList=document.getElementById('list');
        this.about=document.getElementById('about');
        this.form=document.getElementById('form');
        this.remove=document.getElementById('remove');
        this.bookForm=document.getElementById('bookForm');
        this.messages=document.getElementById('messages');
    }


    renderModuleList(modules) {
      const selectUI=document.getElementById("id-module");
     modules.forEach((module)=>{
      const option=document.createElement("option");
      option.value=module.code;
      option.textContent=module.cliteral;
      selectUI.appendChild(option);
    });
    }
  
    
    
    renderBook(book) {
      const bookUI=document.createElement('div');
      bookUI.className='card';
      bookUI.innerHTML=`
      <img src="${book.photo}" alt="Libro: ${book.id}">
      <div>
        <h3>${book.moduleCode} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages}</p>
        <p>Estado: ${book.status}</p>
        <p>En venta // Vendido el 21/12/2023${book.soldDate}</p>
        <p>${book.comments}</p>
        <h4>${book.price.toFixed(2)}</h4>
      </div>`

      this.booksList.appendChild(bookUI);
   
    }
      
      

      renderMessage(type, message) {
        const messageUI = document.createElement('div');
        messageUI.className = type +`alert alert-danger alert-dismissible`;
        messageUI.innerHTML = `
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
        `;
        this.messages.appendChild(messageUI);
      }


      setBookSubmitHandler(callback) {  
        this.bookForm.addEventListener('submit', (event) => {
           event.preventDefault()
           // a continuación recoge los datos del formulario y los guarda en un objeto // por último llama a la función recibida pasándole dicho objeto
           const moduleCode=document.getElementById('id-module').value;
           const publisher=document.getElementById('publisher').value;
           const price=Number(document.getElementById('price').value);
           const pages=Number(document.getElementById('pages').value);
           const status=document.querySelector('input[name="status"]:checked')?.value;
           const comments=document.getElementById('comments').value;
        callback({
          moduleCode,
          publisher,
          price,
          pages,
          status,
          comments
         })
        })
       }
       
       setBookRemoveHandler(callback) {
         this.remove.addEventListener('click', () => {
           // recoge la id del libro a borrar y la pasa a la fn
           const idToRemove=document.getElementById("id-remove").value;
           callback(idToRemove)
         })
       }
    }
    
    export default View;