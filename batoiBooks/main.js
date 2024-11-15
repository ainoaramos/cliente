import Controller from './src/controller/controller.js';
import { Router } from './src/services/router.js';
import View from './src/view/view.js';  

document.addEventListener('DOMContentLoaded', () => {
  const view = new View(); 
  const myController = new Controller(view);  
  myController.init();  


  const router = new Router(view);  
});



    





