const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Por favor, ingresa tu nombre: ", (name) => {
  const fechaActual = new Date();
  const hora = fechaActual.getHours();

  let saludo;

  if (hora >= 5 && hora < 12) {
    saludo = "Buenos días";
  } else if (hora >= 12 && hora < 19) {
    saludo = "Buenas tardes";
  } else {
    saludo = "Buenas noches";
  }

  console.log(`${saludo}, ${name}!`);

  rl.close();
});
