import Module from './module.class.js';
import { getDBModules} from '../services/modules.api.js'; 

export default class Modules{
    constructor(){
        this.data=[]
    }

    toString() {
        return this.data.map(module => module.toString()).join();
    }

    async  populate() {
        try {
            const modules = await getDBModules();
            this.data = modules.map(moduleData => new Module(moduleData.code, moduleData.cliteral, moduleData.vliteral, moduleData.courseId));
        } catch (error) {
            console.error("Error al obtener los módulos:", error);
        }
    
    }


     getModuleByCode(moduleCode){
        let module=this.data.find(mod => mod.code===moduleCode);
      
        if(!module){
          throw new Error("Modulo no encontrado");
        }
        return module;
          
      }
    }