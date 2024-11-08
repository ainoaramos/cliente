
const SERVER = 'http://localhost:3000';


async function getDBBooks() {
  const response = await fetch(`${SERVER}/books`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getDBBook(bookId) {
  const response = await fetch(`${SERVER}/books/${bookId}`);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function addDBBook(newBook) {
  const response = await fetch(`${SERVER}/books`, {
    method: "POST",
    body: JSON.stringify(newBook),
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
async function removeDBBook(bookId) {
  const response = await fetch(`${SERVER}/books/${bookId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function changeDBBook(newBook) {
  const response = await fetch(`${SERVER}/books/${newBook.id}`, {
    method: "PUT",
    body: JSON.stringify(newBook),
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

export { getDBBooks, getDBBook, addDBBook, removeDBBook, changeDBBook };