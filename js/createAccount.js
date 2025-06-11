import { addUser, createUserDatabase } from './accounts.js';

// Redirigir al index si ya hay un usuario logueado
if (localStorage.getItem("loggedInUser")) {
  window.location.href = "/";
}

// Crear base de datos si no existe
createUserDatabase();

// Limpiar campos al cargar la página
$(document).ready(() => {
  $("#nombre").val("");
  $("#email").val("");
  $("#password").val("");
  $("#confirmar").val("");
});

// Manejador del formulario
$("#register").on("submit", (event) => {
  event.preventDefault();

  // Obtener valores del formulario
  const nombre = $("#nombre").val().trim();
  const email = $("#email").val().trim();
  const password = $("#password").val();
  const confirmar = $("#confirmar").val();

  // Validaciones
  if (password.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  if (password !== confirmar) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Intentar agregar usuario
  const resultado = addUser(nombre, email, password);

  if (resultado === 0) {
    alert("El correo ya está registrado.");
  } else {
    alert("Cuenta creada con éxito.");
    window.location.href = "/docs/profile.html";
  }
});
