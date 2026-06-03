/* Funciones para vistas de administrador */

document.addEventListener("DOMContentLoaded", function() {
  const pagina = window.location.pathname.split("/").pop();

  if ([
    "admin-productos.html",
    "admin-inventario.html",
    "admin-usuarios.html"
  ].includes(pagina)) {
    protegerRuta(["admin"]);
  }

  if (pagina === "admin-productos.html") {
    configurarFormularioProducto();
    renderizarProductosAdmin();
  }

  if (pagina === "admin-inventario.html") {
    renderizarInventario();
  }

  if (pagina === "admin-usuarios.html") {
    renderizarUsuariosAdmin();
  }
});

/* Productos */

function configurarFormularioProducto() {
  const formProducto = document.getElementById("formProducto");

  formProducto.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("productoNombre");
    const categoria = document.getElementById("productoCategoria");
    const precio = document.getElementById("productoPrecio");
    const stock = document.getElementById("productoStock");
    const descuento = document.getElementById("productoDescuento");
    const imagen = document.getElementById("productoImagen");
    const mensajeProducto = document.getElementById("mensajeProducto");

    limpiarErroresAdmin();

    let valido = true;

    if (nombre.value.trim() === "") {
      mostrarErrorAdmin(nombre, "errorProductoNombre", "El nombre del producto es obligatorio.");
      valido = false;
    }

    if (categoria.value === "") {
      mostrarErrorAdmin(categoria, "errorProductoCategoria", "Debes seleccionar una categoría.");
      valido = false;
    }

    if (precio.value === "" || Number(precio.value) <= 0) {
      mostrarErrorAdmin(precio, "errorProductoPrecio", "El precio debe ser mayor a 0.");
      valido = false;
    }

    if (stock.value === "" || Number(stock.value) < 0) {
      mostrarErrorAdmin(stock, "errorProductoStock", "El stock no puede ser negativo.");
      valido = false;
    }

    if (descuento.value !== "" && (Number(descuento.value) < 0 || Number(descuento.value) > 100)) {
      mostrarErrorAdmin(
        descuento,
        "errorProductoDescuento",
        "El descuento debe estar entre 0 y 100."
      );
      valido = false;
    }

    if (imagen.value.trim() !== "" && !imagen.value.trim().startsWith("../img/juegos/")) {
      mostrarErrorAdmin(
        imagen,
        "errorProductoImagen",
        "La ruta debe comenzar con ../img/juegos/"
      );
      valido = false;
    }

    if (!valido) {
      mensajeProducto.style.display = "none";
      return;
    }

    const productos = obtenerProductos();

    const nuevoProducto = {
      id: Date.now(),
      nombre: nombre.value.trim(),
      categoria: categoria.value,
      precio: Number(precio.value),
      stock: Number(stock.value),
      descuento: Number(descuento.value) || 0,
      imagen: imagen.value.trim() || "img/juegos/default.jpg"
    };

    productos.push(nuevoProducto);
    guardarProductos(productos);

    mensajeProducto.style.display = "block";
    formProducto.reset();

    renderizarProductosAdmin();
  });
}

function renderizarProductosAdmin() {
  const tablaProductos = document.getElementById("tablaProductos");

  if (!tablaProductos) {
    return;
  }

  const productos = obtenerProductos();

  if (productos.length === 0) {
    tablaProductos.innerHTML = `
      <tr>
        <td colspan="5" class="text-center">No hay productos registrados.</td>
      </tr>
    `;
    return;
  }

  tablaProductos.innerHTML = "";

  productos.forEach(producto => {
    const textoDescuento = producto.descuento > 0
      ? `${producto.descuento}% de descuento`
      : "Sin descuento";
      
    tablaProductos.innerHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>$${producto.precio.toLocaleString("es-CL")}</td>
        <td>${producto.stock}</td>
        <td>${textoDescuento}</td>
        <td>${producto.imagen || "Sin imagen"}</td>
      </tr>
    `;
  });
}

/* Inventario */

function renderizarInventario() {
  const tablaInventario = document.getElementById("tablaInventario");

  if (!tablaInventario) {
    return;
  }

  const productos = obtenerProductos();

  if (productos.length === 0) {
    tablaInventario.innerHTML = `
      <tr>
        <td colspan="4" class="text-center">No hay inventario disponible.</td>
      </tr>
    `;
    return;
  }

  tablaInventario.innerHTML = "";

  productos.forEach(producto => {
    let estado = "Disponible";

    if (producto.stock === 0) {
      estado = "Sin stock";
    } else if (producto.stock <= 3) {
      estado = "Stock bajo";
    }

    tablaInventario.innerHTML += `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.stock}</td>
        <td>${estado}</td>
      </tr>
    `;
  });
}

/* Utilidades */

function limpiarErroresAdmin() {
  const errores = document.querySelectorAll(".error-message");

  errores.forEach(error => {
    error.textContent = "";
  });

  const inputs = document.querySelectorAll(".form-control");

  inputs.forEach(input => {
    input.classList.remove("is-invalid");
    input.classList.remove("is-valid");
  });
}

function mostrarErrorAdmin(input, idMensaje, mensaje) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  document.getElementById(idMensaje).textContent = mensaje;
}

/* Usuarios */

function renderizarUsuariosAdmin() {
  const tablaUsuarios = document.getElementById("tablaUsuarios");

  if (!tablaUsuarios) {
    return;
  }

  const usuarios = obtenerUsuarios();

  if (usuarios.length === 0) {
    tablaUsuarios.innerHTML = `
      <tr>
        <td colspan="4" class="text-center">No hay usuarios registrados.</td>
      </tr>
    `;
    return;
  }

  tablaUsuarios.innerHTML = "";

  usuarios.forEach(usuario => {
    const accion = usuario.rol === "cliente"
      ? `<button class="btn btn-primary btn-sm" onclick="convertirEnAdmin(${usuario.id})">Convertir en admin</button>`
      : `<span class="badge bg-secondary">Administrador</span>`;

    tablaUsuarios.innerHTML += `
      <tr>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.rol}</td>
        <td>${accion}</td>
      </tr>
    `;
  });
}

function convertirEnAdmin(idUsuario) {
  const usuarios = obtenerUsuarios();

  const indiceUsuario = usuarios.findIndex(usuario => usuario.id === idUsuario);

  if (indiceUsuario === -1) {
    return;
  }

  usuarios[indiceUsuario].rol = "admin";
  guardarUsuarios(usuarios);

  renderizarUsuariosAdmin();
}