import User from './user.class.js';
import { getDBUsers, addDBUser, removeDBUser, changeDBUser, changeDBUserPassword} from '../services/users.api.js';

export default class Users{
    constructor(){
        this.data=[]
    }

    toString() {
        return this.data.map(user => user.toString()).join();
    }

    async populate(){
        try{
            const users = await getDBUsers();
            this.data=users.map(userData=>new User(userData.id, userData.nick, userData.email, userData.password));
    }catch(error){
        console.error("Error al obtener los usuarios");
    }
}

    async addUser(userData) {
    try{
        const newUserData=await addDBUser(userData);
        const newUser= new User (newUserData.id, newUserData.nick, newUserData.email, newUserData.password);
        this.data.push(newUser);
        return newUser;
    }catch(error){
        console.error("Error al añadir el usuario");

    }
}
    

    async removeUser(id) {
        const posicion = this.data.findIndex(user => user.id === id);

        if (posicion === -1) {
            throw new Error("Usuario no encontrado");
        }
        try {
            await removeDBUser(id); 
            this.data.splice(posicion, 1); 
            return "Usuario eliminado";
        } catch (error) {
            throw new Error("Error al eliminar el usuario de la base de datos");
        }
    }

    


    async changeUser(cambiarUser) {
        try {
            const updateUserData = await changeDBUser(cambiarUser);
            const posicion = this.data.findIndex(user => user.id === updateUserData.id);
    
            if (posicion === -1) {
                throw new UserNotFoundError("Usuario no encontrado");
            }
    
            this.data[posicion] = new User(updateUserData);
            return this.data[posicion];
        } catch (error) {
            console.error("Error al modificar el usuario:", error);
            throw error;
        }
    }
    
    async changeUserPassword(userId, newPassword) {
        const userIndex = this.data.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            throw new Error("Usuario no encontrado");
        }
        try {
           
            const updatedUser = await changeDBUserPassword(userId, newPassword);
            this.data[userIndex].password = updatedUser.password;
            
            return this.data[userIndex]; 
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            throw new Error("Error al cambiar la contraseña"); 
        }
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