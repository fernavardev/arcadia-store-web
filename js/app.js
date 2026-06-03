/* Catálogo dinámico por categoría */

document.addEventListener("DOMContentLoaded", function() {
    renderizarNavbar();
    renderizarCatalogoCategoria();
});

function renderizarCatalogoCategoria() {
  const contenedor = document.getElementById("catalogoCategoria");

  if (!contenedor) {
    return;
  }

  const categoriaActual = contenedor.dataset.categoria;
  const productos = obtenerProductos().filter(
    producto => producto.categoria === categoriaActual
  );

  if (productos.length === 0) {
    contenedor.innerHTML = `
      <article class="game-card">
        <h3>Sin productos</h3>
        <p>No existen productos registrados para esta categoría.</p>
      </article>
    `;
    return;
  }

  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const textoDescuento = producto.descuento > 0
        ? `${producto.descuento}% de descuento`
        : "Sin descuento";
        
    contenedor.innerHTML += `
      <article class="game-card h-100">
        <img src="${producto.imagen || "../img/juegos/default.jpg"}" class="img-fluid" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Categoría: ${producto.categoria}</p>
        <p class="price">$${producto.precio.toLocaleString("es-CL")}</p>
        <p class="discount">${textoDescuento}</p>
        <p>Stock disponible: ${producto.stock}</p>
        <button class="btn btn-primary" onclick="agregarProductoAlCarrito(${producto.id})">
          Agregar al carrito
        </button>
      </article>
    `;
  });
}

function agregarProductoAlCarrito(idProducto) {
  const rolActivo = obtenerRolActivo();
  const correoActivo = obtenerCorreoActivo();

  if (!correoActivo || rolActivo !== "cliente") {
    window.location.href = "../login.html";
    return;
  }

  const productos = obtenerProductos();
  const producto = productos.find(item => item.id === idProducto);

  if (!producto || producto.stock <= 0) {
    return;
  }

  const carrito = obtenerCarrito();

  const itemExistente = carrito.find(
    item => item.productoId === idProducto && item.correoUsuario === correoActivo
  );

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({
      id: Date.now(),
      correoUsuario: correoActivo,
      productoId: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);

  window.location.href = "../carrito.html";
}

function renderizarNavbar() {
  const nav = document.getElementById("navPrincipal");

  if (!nav) {
    return;
  }

  const estaEnCategoria = window.location.pathname.includes("/categorias/");
  const prefijo = estaEnCategoria ? "../" : "";

  const rolActivo = obtenerRolActivo();

  let enlacesSesion = `
    <a href="${prefijo}registro.html">Registro</a>
    <a href="${prefijo}login.html">Login</a>
  `;

  if (rolActivo === "cliente") {
    enlacesSesion = `
      <a href="${prefijo}perfil.html">Perfil</a>
      <a href="${prefijo}carrito.html">Carrito</a>
      <a href="${prefijo}mis-compras.html">Mis compras</a>
      <a href="#" onclick="cerrarSesion()">Cerrar sesión</a>
    `;
  }

  if (rolActivo === "admin") {
    enlacesSesion = `
      <a href="${prefijo}admin-productos.html">Productos</a>
      <a href="${prefijo}admin-inventario.html">Inventario</a>
      <a href="${prefijo}admin-usuarios.html">Usuarios</a>
      <a href="#" onclick="cerrarSesion()">Cerrar sesión</a>
    `;
  }

  const rutaCategorias = estaEnCategoria ? "" : "categorias/";

  nav.innerHTML = `
    <a href="${prefijo}index.html">Inicio</a>
    <a href="${rutaCategorias}estrategia.html">Estrategia</a>
    <a href="${rutaCategorias}familiares.html">Familiares</a>
    <a href="${rutaCategorias}cartas.html">Cartas</a>
    <a href="${rutaCategorias}cooperativos.html">Cooperativos</a>
    ${enlacesSesion}
  `;
}