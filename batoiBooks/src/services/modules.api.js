
const SERVER = 'http://localhost:3000';

async function getDBModules() {
    const response = await fetch(`${SERVER}/modules`);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    const data = await response.json();
    return data;
  }
  
  async function getDBModule(moduleCode) {
    const response = await fetch(`${SERVER}/modules?code=${moduleCode}`);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    const data = await response.json();
    return data[0];
  }
  
  export { getDBModules, getDBModule };