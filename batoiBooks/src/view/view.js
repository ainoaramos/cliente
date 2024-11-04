class View{

    constructor(){
        this.booksList=document.getElementById('list');
        this.about=document.getElementById('about');
        this.form=document.getElementById('form');
        this.remove=document.getElementById('remove');
        this.bookForm=document.getElementById('bookForm');
        this.messages=document.getElementById('messages');
    }

    renderModuleOptions(modules) {
        modules.forEach(module => {
          const option = document.createElement('option');
          option.value = module.code;
          option.textContent = module.cliteral;
          this.moduleSelect.appendChild(option);
        });
      }
    
      renderBookList(books) {
        this.booksList.innerHTML = '<h2>Lista de Libros</h2><ul></ul>';
        const ul = this.booksList.querySelector('ul');
        books.forEach(book => {
          const li = document.createElement('li');
          li.textContent = `${book.title} por ${book.author} (Módulo: ${book.moduleId})`;
          ul.appendChild(li);
        });
      }
      
      
      showMessage(type, message) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type === 'error' ? 'danger' : 'info'} alert-dismissible`;
        alert.innerHTML = `
          ${message}
          <button type="button" class="btn-close" onclick="this.parentElement.remove()">x</button>
        `;
        this.messages.appendChild(alert);
    
        
        if (type !== 'error') {
          setTimeout(() => alert.remove(), 3000);
        }
      }
    
     
      setBookSubmitHandler(callback) {
        this.form.addEventListener('submit', (event) => {
          event.preventDefault();
          const formData = new FormData(this.form);
          const payload = Object.fromEntries(formData.entries());
          callback(payload);
        });
      }
    
      setBookRemoveHandler(callback) {
        this.removeButton.addEventListener('click', () => {
          const bookId = document.getElementById('id-remove').value; 
          callback(bookId);
        });
      }

      renderOptions(books) {
        const list = document.getElementById('listalibro'); 
        if (!list) {
            console.error("El elemento con ID 'listalibro' no se encontró.");
            return; 
        }
    
        list.innerHTML = books.map(book => `
                  <div class="card">
                    <h3>${book.title}</h3>
                    <h4>${book.publisher}</h4>
                    <p>${book.pages} páginas</p>
                    <p>Estado: ${book.status}</p>
                    <p>${book.comments}</p>
                    <h4>${book.price} €</h4>
                </div>`
            )
            .join('');
        }
}
    
    export default View;