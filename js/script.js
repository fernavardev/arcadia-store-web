const formulario = document.getElementById("formularioRegistro");

const nombre = document.getElementById("nombre");
const usuario = document.getElementById("usuario");
const correo = document.getElementById("correo");
const fechaNacimiento = document.getElementById("fechaNacimiento");
const password = document.getElementById("password");
const repetirPassword = document.getElementById("repetirPassword");
const direccion = document.getElementById("direccion");

const mensajeExito = document.getElementById("mensajeExito");

const btnLimpiar = document.getElementById("btnLimpiar");

/* Eventos */
formulario.addEventListener("submit", validarFormulario);

btnLimpiar.addEventListener("click", limpiarFormulario);

/* Validación principal */
function validarFormulario(event) {

  event.preventDefault();

  let formularioValido = true;

  limpiarMensajes();

  /* Nombre */
  if (nombre.value.trim() === "") {

    mostrarError(
      nombre,
      "errorNombre",
      "Debes ingresar tu nombre completo."
    );

    formularioValido = false;

  } else {

    mostrarValido(nombre);
  }

  /* Usuario */
  if (usuario.value.trim() === "") {

    mostrarError(
      usuario,
      "errorUsuario",
      "Debes ingresar un nombre de usuario."
    );

    formularioValido = false;

  } else {

    mostrarValido(usuario);
  }

  /* Correo */
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!patronCorreo.test(correo.value)) {

    mostrarError(
      correo,
      "errorCorreo",
      "Debes ingresar un correo válido."
    );

    formularioValido = false;

  } else {

    mostrarValido(correo);
  }

  /* Fecha nacimiento */
  if (!validarEdad(fechaNacimiento.value)) {

    mostrarError(
      fechaNacimiento,
      "errorFecha",
      "Debes tener al menos 13 años."
    );

    formularioValido = false;

  } else {

    mostrarValido(fechaNacimiento);
  }

  /* Contraseña */
  const passwordTexto = password.value;

  const tieneMayuscula = /[A-Z]/.test(passwordTexto);
  const tieneNumero = /[0-9]/.test(passwordTexto);

  if (
    passwordTexto.length < 6 ||
    passwordTexto.length > 18 ||
    !tieneMayuscula ||
    !tieneNumero
  ) {

    mostrarError(
      password,
      "errorPassword",
      "La contraseña debe tener entre 6 y 18 caracteres, una mayúscula y un número."
    );

    formularioValido = false;

  } else {

    mostrarValido(password);
  }

  /* Repetir contraseña */
  if (password.value !== repetirPassword.value) {

    mostrarError(
      repetirPassword,
      "errorRepetirPassword",
      "Las contraseñas no coinciden."
    );

    formularioValido = false;

  } else {

    mostrarValido(repetirPassword);
  }

  /* Resultado final */
  if (formularioValido) {

    mensajeExito.style.display = "block";

  } else {

    mensajeExito.style.display = "none";
  }
}

/* Mostrar error */
function mostrarError(input, idMensaje, mensaje) {

  input.classList.add("is-invalid");

  input.classList.remove("is-valid");

  document.getElementById(idMensaje).textContent = mensaje;
}

/* Mostrar válido */
function mostrarValido(input) {

  input.classList.remove("is-invalid");

  input.classList.add("is-valid");
}

/* Limpiar mensajes */
function limpiarMensajes() {

  const mensajesError = document.querySelectorAll(".error-message");

  mensajesError.forEach(mensaje => {
    mensaje.textContent = "";
  });

  mensajeExito.style.display = "none";

  const inputs = document.querySelectorAll(".form-control");

  inputs.forEach(input => {

    input.classList.remove("is-valid");
    input.classList.remove("is-invalid");

  });
}

/* Validar edad */
function validarEdad(fecha) {

  if (fecha === "") {
    return false;
  }

  const fechaActual = new Date();

  const fechaNacimientoUsuario = new Date(fecha);

  let edad = fechaActual.getFullYear() - fechaNacimientoUsuario.getFullYear();

  const mes = fechaActual.getMonth() - fechaNacimientoUsuario.getMonth();

  if (
    mes < 0 ||
    (mes === 0 && fechaActual.getDate() < fechaNacimientoUsuario.getDate())
  ) {
    edad--;
  }

  return edad >= 13;
}

/* Limpiar formulario */
function limpiarFormulario() {

  formulario.reset();

  limpiarMensajes();
}