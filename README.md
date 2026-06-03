# Arcadia Store

## Descripción

La aplicación simula una tienda online especializada en juegos de mesa, permitiendo gestionar usuarios, productos, inventario, carrito de compras e historial de compras mediante tecnologías FrontEnd

Durante esta etapa del proyecto se utiliza almacenamiento local del navegador mediante Local Storage y Session Storage para simular el comportamiento de una aplicación con backend

---

## Tecnologías utilizadas

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* Local Storage
* Session Storage
* GitHub
* Trello

---

## Funcionalidades implementadas

### Usuarios

* Registro de usuarios
* Inicio de sesión
* Recuperación de contraseña
* Modificación de perfil
* Gestión de sesión mediante Session Storage

### Roles

#### Cliente

* Visualización de categorías
* Visualización de productos
* Agregar productos al carrito
* Modificar cantidades del carrito
* Finalizar compras
* Consultar historial de compras

#### Administrador

* Administración de productos
* Administración de inventario
* Administración de usuarios
* Conversión de usuarios cliente a administrador

---

## Validaciones implementadas

* Campos obligatorios
* Formato de correo electrónico
* Contraseñas seguras
* Confirmación de contraseña
* Validación de descuentos
* Validación de rutas de imagen (solo demostrativa)
* Validación de formularios mediante JavaScript

---

## Simulación FrontEnd

La aplicación utiliza Local Storage y Session Storage para simular:

* Base de datos de usuarios
* Base de datos de productos
* Carrito de compras
* Historial de compras
* Inicio y cierre de sesión
* Control de roles y permisos

---

## Estructura principal del proyecto

```text
css/
└─ style.css

js/
├─ data.js
├─ storage.js
├─ auth.js
├─ registro.js
├─ admin.js
├─ cliente.js
└─ app.js

categorias/
├─ estrategia.html
├─ familiares.html
├─ cartas.html
└─ cooperativos.html

index.html
login.html
registro.html
recuperar.html
perfil.html
carrito.html
mis-compras.html
admin-productos.html
admin-inventario.html
admin-usuarios.html
```

---

## Mejoras futuras

* Validaciones en tiempo real mediante eventos input y change
* Navbar Bootstrap responsiva con menú hamburguesa

