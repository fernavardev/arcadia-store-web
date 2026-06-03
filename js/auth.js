/* Simulación de sesión y roles con sessionStorage */

const KEY_USUARIO_ACTIVO = "arcadiaUsuarioActivo";
const KEY_ROL_ACTIVO = "arcadiaRolActivo";

function iniciarSesion(usuario) {
  sessionStorage.setItem(KEY_USUARIO_ACTIVO, usuario.correo);
  sessionStorage.setItem(KEY_ROL_ACTIVO, usuario.rol);
}

function cerrarSesion() {
  sessionStorage.removeItem(KEY_USUARIO_ACTIVO);
  sessionStorage.removeItem(KEY_ROL_ACTIVO);
  window.location.href = "login.html";
}

function obtenerCorreoActivo() {
  return sessionStorage.getItem(KEY_USUARIO_ACTIVO);
}

function obtenerRolActivo() {
  return sessionStorage.getItem(KEY_ROL_ACTIVO);
}

function obtenerUsuarioActivo() {
  const correoActivo = obtenerCorreoActivo();

  if (!correoActivo) {
    return null;
  }

  const usuarios = obtenerUsuarios();
  return usuarios.find(usuario => usuario.correo === correoActivo) || null;
}

function protegerRuta(rolesPermitidos) {
  const usuarioActivo = obtenerUsuarioActivo();
  const rolActivo = obtenerRolActivo();

  if (!usuarioActivo || !rolesPermitidos.includes(rolActivo)) {
    window.location.replace("login.html");
  }
}