const objeto = {
  nombre: "Joaquin",
  apellido: "Perez",
  edad: "23",
};

console.log(objeto, "Objeto sin nada");
console.log(
  { ...objeto },
  "Objeto destructurado, y vuelto a poner en un objeto"
);
console.log(
  { ...objeto, nombre: "Felipe" },
  "objeto destructurado cambiando nombre"
);
console.log({ ...objeto, peso: 80 }, "objeto destructurado agregando peso");
