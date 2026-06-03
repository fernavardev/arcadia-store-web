/* Funciones de almacenamiento simulado con localStorage */

const KEY_USUARIOS = "arcadiaUsuarios";
const KEY_PRODUCTOS = "arcadiaProductos";
const KEY_CARRITO = "arcadiaCarrito";
const KEY_COMPRAS = "arcadiaCompras";

function obtenerDatos(clave) {
  return JSON.parse(localStorage.getItem(clave)) || [];
}

function guardarDatos(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}

function inicializarDatosArcadia() {
  if (!localStorage.getItem(KEY_USUARIOS)) {
    guardarDatos(KEY_USUARIOS, ARCADIA_USUARIOS_INICIALES);
  }

  if (!localStorage.getItem(KEY_PRODUCTOS)) {
    guardarDatos(KEY_PRODUCTOS, ARCADIA_PRODUCTOS_INICIALES);
  }

  if (!localStorage.getItem(KEY_CARRITO)) {
    guardarDatos(KEY_CARRITO, []);
  }

  if (!localStorage.getItem(KEY_COMPRAS)) {
    guardarDatos(KEY_COMPRAS, []);
  }
}

function obtenerUsuarios() {
  return obtenerDatos(KEY_USUARIOS);
}

function guardarUsuarios(usuarios) {
  guardarDatos(KEY_USUARIOS, usuarios);
}

function obtenerProductos() {
  return obtenerDatos(KEY_PRODUCTOS);
}

function guardarProductos(productos) {
  guardarDatos(KEY_PRODUCTOS, productos);
}

function obtenerCarrito() {
  return obtenerDatos(KEY_CARRITO);
}

function guardarCarrito(carrito) {
  guardarDatos(KEY_CARRITO, carrito);
}

function obtenerCompras() {
  return obtenerDatos(KEY_COMPRAS);
}

function guardarCompras(compras) {
  guardarDatos(KEY_COMPRAS, compras);
}

inicializarDatosArcadia();