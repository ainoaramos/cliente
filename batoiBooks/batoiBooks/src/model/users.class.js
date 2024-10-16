import User from './user.class.js';

export default class Users{
    constructor(){
        this.data=[]
    }

    toString() {
        return this.data.map(user => user.toString()).join();
    }

    populate(users){
        this.data=users.map(userData=>new User(userData.id, userData.nick, userData.email, userData.password));
    }

    addUser(userData) {
        let ultimoId = 0;  

        if (this.data.length > 0) {
            for (let i = 0; i < this.data.length; i++) {
                let user = this.data[i];
                if (user.id > ultimoId) {
                    ultimoId = user.id; 
            }
        }
    }
    let nuevoId = ultimoId + 1;  
    let nuevoUser = new User(nuevoId, userData.nick, userData.email, userData.password); 
    this.data.push(nuevoUser);  
    return nuevoUser;  
}
    
    

    removeUser(id) {
        let posicion = this.data.findIndex(user => user.id === id);
        if (posicion === -1) {
            throw new Error(`Usuario con id ${id} no encontrado`);
        }
        this.data.splice(posicion, 1); 
    }


    changeUser(cambiarUser) {
        let posicion = this.data.findIndex(user => user.id === cambiarUser.id);   
        if (posicion === -1) {
            throw new Error(`Usuario con id ${cambiarUser.id} no encontrado`);  
        }
        let user = this.data[posicion];  
        user.nick = cambiarUser.nick;  
        user.email = cambiarUser.email; 
        user.password = cambiarUser.password; 
    
        return user;  
    }

    getUserById(userId){
        let user=this.data.find(user => user.id===userId);
          
        if(!user){
            throw new Error("Usuario no encontrado");
             }
            return user;
          }
        

    getUserIndexById(userId){
        let user=this.data.findIndex(user => user.id===userId);
          
        if(user===-1){
            throw new Error("Usuario no encontrado");
                }
            return user;
          }
          
    getUserByNickName(nick){
        let user=this.data.find(user => user.nick===nick);
          
        if(!user){
            throw new Error("Usuario no encontrado");
                }
            return user;
            }

        }