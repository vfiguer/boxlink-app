import { logIn } from './accounts.js'; // Ajusta la ruta si es necesario

// Logout automático al entrar en login
localStorage.removeItem("loggedInUser");

// Limpiar campos al cargar la página
$(document).ready(() => {
  $("#email").val("");
  $("#password").val("");

  $("form").on("submit", (event) => {
    event.preventDefault();

    const email = $("#email").val().trim();
    const password = $("#password").val();

    if (!email || !password) {
      alert("Completa todos los campos.");
      return;
    }

    const user = logIn(email, password);

    if (user === 0) {
      alert("Correo o contraseña incorrectos.");
    } else {
      alert("Inicio de sesión exitoso.");
      window.location.href = "/boxlink-app/docs//profile.html";
    }
  });
});
