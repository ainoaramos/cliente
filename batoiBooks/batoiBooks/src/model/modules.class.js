import Module from './module.class.js';

export default class Modules{
    constructor(){
        this.data=[]
    }

    populate(modules){
        this.data=modules.map(moduleData=>new Module(moduleData.code, moduleData.cliteral, moduleData.vliteral, moduleData.courseId));
    }

    toString() {
        return this.data.map(module => module.toString()).join();
    }

     getModuleByCode(moduleCode){
        let module=this.data.find(mod => mod.code===moduleCode);
      
        if(!module){
          throw new Error("Modulo no encontrado");
        }
        return module;
          
      }
}