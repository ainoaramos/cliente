export class Router {
    constructor(view) {
      this.view = view;
      this.routes = {
        '#list': this.showList,
        '#form': this.showForm,
        '#about': this.showAbout,
      };
  
      window.addEventListener('hashchange', this.handleRouteChange.bind(this));
  
      this.handleRouteChange();
    }
  
    
    handleRouteChange() {
      const route = window.location.hash || '#list'; 
      this.hideAllSections(); 
      if (this.routes[route]) {
        this.routes[route].call(this); 
      }
    }
  
   
    hideAllSections() {
      
      document.getElementById('list').style.display = 'none';
      document.getElementById('form').style.display = 'none';
      document.getElementById('about').style.display = 'none';
    }
  
    
    showList() {
      document.getElementById('list').style.display = 'block';
     
    }
  
  
    showForm() {
      document.getElementById('form').style.display = 'block';
    }
  
   
    showAbout() {
      document.getElementById('about').style.display = 'block';
    
    }
  }
  
  