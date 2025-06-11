export function createUserDatabase() {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
}

export function addUser(name, email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email)) {
    return 0;
  }

  let id = getID();
  const newUser = {
    id,
    name,
    email,
    password,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Guardar sesión automáticamente
  localStorage.setItem("loggedInUser", id);

  return newUser;
}


export function getID() {
  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

export function logIn(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem("loggedInUser", user.id);
    return user;
  } else {
    return 0;
  }
}

export function getUserById(id) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find((user) => user.id === id) || null;
}
