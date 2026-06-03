/* Funciones para vistas de cliente */

document.addEventListener("DOMContentLoaded", function() {
  const pagina = window.location.pathname.split("/").pop();

  if (["perfil.html", "carrito.html", "mis-compras.html"].includes(pagina)) {
    protegerRuta(["cliente"]);
  }

  if (pagina === "perfil.html") {
    cargarPerfil();
    configurarFormularioPerfil();
  }

  if (pagina === "carrito.html") {
    renderizarCarrito();
    configurarFinalizarCompra();
  }

  if (pagina === "mis-compras.html") {
    renderizarCompras();
  }
});

function cargarPerfil() {
  const usuarioActivo = obtenerUsuarioActivo();

  if (!usuarioActivo) {
    return;
  }

  document.getElementById("perfilNombre").value = usuarioActivo.nombre;
  document.getElementById("perfilUsuario").value = usuarioActivo.usuario;
  document.getElementById("perfilCorreo").value = usuarioActivo.correo;
  document.getElementById("perfilDireccion").value = usuarioActivo.direccion || "";
}

function configurarFormularioPerfil() {
  const formPerfil = document.getElementById("formPerfil");
  const mensajePerfil = document.getElementById("mensajePerfil");

  formPerfil.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("perfilNombre");
    const usuario = document.getElementById("perfilUsuario");
    const correo = document.getElementById("perfilCorreo");
    const direccion = document.getElementById("perfilDireccion");

    limpiarErroresPerfil();

    let valido = true;

    if (nombre.value.trim() === "") {
      mostrarErrorPerfil(nombre, "errorPerfilNombre", "El nombre es obligatorio.");
      valido = false;
    }

    if (usuario.value.trim() === "") {
      mostrarErrorPerfil(usuario, "errorPerfilUsuario", "El usuario es obligatorio.");
      valido = false;
    }

    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!patronCorreo.test(correo.value.trim())) {
      mostrarErrorPerfil(correo, "errorPerfilCorreo", "El correo no tiene un formato válido.");
      valido = false;
    }

    if (!valido) {
      mensajePerfil.style.display = "none";
      return;
    }

    const usuarios = obtenerUsuarios();
    const correoActivo = obtenerCorreoActivo();

    const indiceUsuario = usuarios.findIndex(item => item.correo === correoActivo);

    if (indiceUsuario === -1) {
      return;
    }

    usuarios[indiceUsuario].nombre = nombre.value.trim();
    usuarios[indiceUsuario].usuario = usuario.value.trim();
    usuarios[indiceUsuario].correo = correo.value.trim();
    usuarios[indiceUsuario].direccion = direccion.value.trim();

    guardarUsuarios(usuarios);

    sessionStorage.setItem(KEY_USUARIO_ACTIVO, correo.value.trim());

    mensajePerfil.style.display = "block";
  });
}

function limpiarErroresPerfil() {
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

function mostrarErrorPerfil(input, idMensaje, mensaje) {
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
  document.getElementById(idMensaje).textContent = mensaje;
}

/* Carrito */

function renderizarCarrito() {
  const tablaCarrito = document.getElementById("tablaCarrito");

  if (!tablaCarrito) {
    return;
  }

  const correoActivo = obtenerCorreoActivo();
  const carrito = obtenerCarrito().filter(item => item.correoUsuario === correoActivo);

  if (carrito.length === 0) {
    tablaCarrito.innerHTML = `
      <tr>
        <td colspan="4" class="text-center">Aún no hay productos en el carrito.</td>
      </tr>
    `;
    return;
  }

  tablaCarrito.innerHTML = "";

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;

    tablaCarrito.innerHTML += `
      <tr>
        <td>${item.nombre}</td>
        <td>$${item.precio.toLocaleString("es-CL")}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="disminuirCantidad(${item.productoId})">-</button>
          <span class="mx-2">${item.cantidad}</span>
          <button class="btn btn-primary btn-sm" onclick="aumentarCantidad(${item.productoId})">+</button>
        </td>
        <td>$${subtotal.toLocaleString("es-CL")}</td>
      </tr>
    `;
  });
}

function configurarFinalizarCompra() {
  const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");

  if (!btnFinalizarCompra) {
    return;
  }

  btnFinalizarCompra.addEventListener("click", function() {
    const mensajeCompra = document.getElementById("mensajeCompra");

    if (mensajeCompra) {
      mensajeCompra.style.display = "none";
    }

    const correoActivo = obtenerCorreoActivo();

    const carritoCompleto = obtenerCarrito();
    const carritoUsuario = carritoCompleto.filter(item => item.correoUsuario === correoActivo);

    if (carritoUsuario.length === 0) {
      return;
    }

    const total = carritoUsuario.reduce((suma, item) => {
      return suma + item.precio * item.cantidad;
    }, 0);

    const compras = obtenerCompras();

    compras.push({
      id: Date.now(),
      correoUsuario: correoActivo,
      fecha: new Date().toLocaleDateString("es-CL"),
      productos: carritoUsuario,
      total: total
    });

    guardarCompras(compras);

    const carritoActualizado = carritoCompleto.filter(
      item => item.correoUsuario !== correoActivo
    );

    guardarCarrito(carritoActualizado);

    renderizarCarrito();

    if (mensajeCompra) {
      mensajeCompra.style.display = "block";
    }
  });
}

/* Compras */

function renderizarCompras() {
  const tablaCompras = document.getElementById("tablaCompras");

  if (!tablaCompras) {
    return;
  }

  const correoActivo = obtenerCorreoActivo();

  const compras = obtenerCompras().filter(
    compra => compra.correoUsuario === correoActivo
  );

  if (compras.length === 0) {
    tablaCompras.innerHTML = `
      <tr>
        <td colspan="3" class="text-center">Aún no tienes compras registradas.</td>
      </tr>
    `;
    return;
  }

  tablaCompras.innerHTML = "";

  compras.forEach(compra => {
    const nombresProductos = compra.productos
      .map(producto => `${producto.nombre} x${producto.cantidad}`)
      .join(", ");

    tablaCompras.innerHTML += `
      <tr>
        <td>${compra.fecha}</td>
        <td>${nombresProductos}</td>
        <td>$${compra.total.toLocaleString("es-CL")}</td>
      </tr>
    `;
  });
}

function aumentarCantidad(idProducto) {
  const correoActivo = obtenerCorreoActivo();
  const carrito = obtenerCarrito();

  const item = carrito.find(
    producto => producto.productoId === idProducto && producto.correoUsuario === correoActivo
  );

  if (!item) {
    return;
  }

  item.cantidad += 1;
  guardarCarrito(carrito);
  renderizarCarrito();
}

function disminuirCantidad(idProducto) {
  const correoActivo = obtenerCorreoActivo();
  let carrito = obtenerCarrito();

  const item = carrito.find(
    producto => producto.productoId === idProducto && producto.correoUsuario === correoActivo
  );

  if (!item) {
    return;
  }

  item.cantidad -= 1;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(
      producto => !(producto.productoId === idProducto && producto.correoUsuario === correoActivo)
    );
  }

  guardarCarrito(carrito);
  renderizarCarrito();
}