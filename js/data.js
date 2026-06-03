/* Datos iniciales simulados para Arcadia Store */

const ARCADIA_USUARIOS_INICIALES = [
  {
    id: 1,
    nombre: "Administrador Arcadia",
    usuario: "admin",
    correo: "admin@arcadia.cl",
    password: "Admin123*",
    direccion: "Casa matriz Arcadia Store",
    rol: "admin"
  },
  {
    id: 2,
    nombre: "Soporte Arcadia",
    usuario: "soporte",
    correo: "soporte@arcadia.cl",
    password: "Soporte123*",
    direccion: "Área soporte Arcadia Store",
    rol: "admin"
  }
];

const ARCADIA_PRODUCTOS_INICIALES = [
  { id: 1, nombre: "Catan", categoria: "Estrategia", precio: 34990, stock: 8, descuento: 10, imagen: "../img/juegos/catan.jpg" },
  { id: 2, nombre: "Carcassonne", categoria: "Estrategia", precio: 27990, stock: 7, descuento: 0, imagen: "../img/juegos/carcassonne.jpg" },
  { id: 3, nombre: "Ticket to Ride", categoria: "Estrategia", precio: 39990, stock: 6, descuento: 15, imagen: "../img/juegos/ticket-to-ride.jpg" },

  { id: 4, nombre: "Dixit", categoria: "Familiares", precio: 29990, stock: 10, descuento: 0, imagen: "../img/juegos/dixit.jpg" },
  { id: 5, nombre: "Dobble", categoria: "Familiares", precio: 14990, stock: 15, descuento: 5, imagen: "../img/juegos/dobble.jpg" },
  { id: 6, nombre: "UNO", categoria: "Familiares", precio: 9990, stock: 20, descuento: 0, imagen: "../img/juegos/uno.jpg" },

  { id: 7, nombre: "Exploding Kittens", categoria: "Cartas", precio: 18990, stock: 12, descuento: 10, imagen: "../img/juegos/exploding-kittens.jpg" },
  { id: 8, nombre: "Sushi Go!", categoria: "Cartas", precio: 16990, stock: 11, descuento: 0, imagen: "../img/juegos/sushi-go.jpg" },
  { id: 9, nombre: "The Mind", categoria: "Cartas", precio: 15990, stock: 9, descuento: 5, imagen: "../img/juegos/the-mind.jpg" },

  { id: 10, nombre: "Pandemic", categoria: "Cooperativos", precio: 36990, stock: 6, descuento: 15, imagen: "../img/juegos/pandemic.jpg" },
  { id: 11, nombre: "Hanabi", categoria: "Cooperativos", precio: 13990, stock: 14, descuento: 0, imagen: "../img/juegos/hanabi.jpg" },
  { id: 12, nombre: "The Crew", categoria: "Cooperativos", precio: 17990, stock: 10, descuento: 10, imagen: "../img/juegos/the-crew.jpg" }
];