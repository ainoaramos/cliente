
const SERVER = 'http://localhost:3000';

async function getDBUsers() {
    const response = await fetch(`${SERVER}/users`);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    const data = await response.json();
    return data;
  }
  
  async function getDBUser(userId) {
    const response = await fetch(`${SERVER}/users/${userId}`);
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    const data = await response.json();
    return data;
  }
  
  async function addDBUser(newUser) {
    const response = await fetch(`${SERVER}/users`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    const data = await response.json();
    return data;
  }
  async function removeDBUser(userId) {
    const response = await fetch(`${SERVER}/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    const data = await response.json();
    return data;
  }
  
  async function changeDBUser(newUser) {
    const response = await fetch(`${SERVER}/users/${newUser.id}`, {
      method: "PUT",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    const data = await response.json();
    return data;
  }
  async function changeDBUserPassword(userId, newPassword) {
    const response = await fetch(`${SERVER}/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ password: newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw `Error ${response.status} de la BBDD: ${response.statusText}`;
    }
    const data = await response.json();
    return data;
  }
  
  export {
    getDBUsers,
    getDBUser,
    addDBUser,
    removeDBUser,
    changeDBUser,
    changeDBUserPassword,
  };