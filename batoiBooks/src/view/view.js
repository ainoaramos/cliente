class View{

  constructor(){
      this.booksList=document.getElementById('list');
      this.about=document.getElementById('about');
      this.form=document.getElementById('form');
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
  validateForm() {
    const form = document.getElementById('bookForm');
    if (form) {
      form.reportValidity();  
    }
  }

  
  renderBook(book) {
    const bookCard=document.createElement('div');
    bookCard.classList.add("card", "book");
    bookCard.id="book-"+book.id;
    bookCard.innerHTML=`
    <img src="${book.photo}" alt="Libro: ${book.id}">
    <div>
      <h3>${book.moduleCode} (${book.id})</h3>
      <h4>${book.publisher}</h4>
      <p>${book.pages}</p>
      <p>Estado: ${book.status}</p>
      <p>En venta // Vendido el 21/12/2023${book.soldDate}</p>
      <p>${book.comments}</p>
      <h4>${book.price.toFixed(2)}</h4>
    </div>
    <div>
    <button class="cart" data-id="${book.id}">
      <span class="material-icons">add_shopping_cart</span>
    </button>
     <button class="edit" data-id="${book.id}">
      <span class="material-icons">edit</span>
    </button>
     <button class="remove" data-id="${book.id}">
      <span class="material-icons">delete</span>
    </button>
    </div>
    `;
    this.booksList.appendChild(bookCard);
  }

  renderFormToAddBook(){
    this.bookForm.querySelector('h3').textContent = 'Añadir libro';
    this.bookForm.querySelector('button[type="submit"]').textContent = 'Añadir';
    document.getElementById("id").parentElement.classList.add("hidden");
  }

  renderBookInForm(book){
  
    this.bookForm.querySelector("h3").textContent = "Editar libro";
    this.bookForm.querySelector("button[type='submit']").textContent = "Editar";
    document.getElementById("id").parentElement.classList.remove("hidden");
    document.getElementById("id").value = book.id;
    document.getElementById("id-module").value = book.moduleCode;
    document.getElementById("publisher").value = book.publisher;
    document.getElementById("price").value = book.price;
    document.getElementById("pages").value = book.pages;
  
  
    const statusRadio = document.querySelector(`input[name='status'][value='${book.status}']`);
    if (statusRadio) {
      statusRadio.checked = true; 
    } else {
      console.error("Estado del libro no válido o no encontrado: " + book.status);
    }
  
    document.getElementById("comments").value = book.comments;
  }
    
    
  renderMessage(type, message) {
    const messageUI = document.createElement('div');
    messageUI.className = type +` alert alert-danger alert-dismissible `;
    messageUI.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()">x</button>
    `;
    this.messages.appendChild(messageUI);
  }

    setBookListHandler(callback){
      this.booksList.addEventListener("click", (event)=>{
        const buttonClicked=event.target.closest("button");
        if(!buttonClicked)return;
        callback(buttonClicked.className, buttonClicked.dataset.id);
      });
    }

    setBookSubmitHandler(callback) {  
      this.bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const payload = {
          moduleCode: document.getElementById('id-module').value,
          publisher: document.getElementById('publisher').value,
          price: document.getElementById('price').value,
          pages: document.getElementById('pages').value,
          status: document.querySelector('input[name="status"]:checked')?.value,
          comments: document.getElementById('comments').value,
        };
    
        if (document.getElementById("id").value) {
          payload.id = document.getElementById("id").value;
        }
    
        callback(payload);
      });
        
     }


     renderEditedBook(book) {
      const bookCard=document.getElementById("book-"+book.id);
      bookCard.innerHTML=`
      <img src="${book.photo}" alt="Libro: ${book.id}">
      <div>
        <h3>${book.moduleCode} (${book.id})</h3>
        <h4>${book.publisher}</h4>
        <p>${book.pages}</p>
        <p>Estado: ${book.status}</p>
        <p>En venta // Vendido el 21/12/2023${book.soldDate}</p>
        <p>${book.comments}</p>
        <h4>${book.price.toFixed(2)}</h4>
      </div>
      <div>
      <button class="cart" data-id="${book.id}">
        <span class="material-icons">add_shopping_cart</span>
      </button>
       <button class="edit" data-id="${book.id}">
        <span class="material-icons">edit</span>
      </button>
       <button class="remove" data-id="${book.id}">
        <span class="material-icons">delete</span>
      </button>
      </div>
      `;
     
    }
  }
    
    export default View;