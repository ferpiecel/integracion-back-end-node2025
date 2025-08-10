/**
 * Script de saludo personalizado basado en la hora del día
 * Utiliza la interfaz readline para interacción con el usuario en terminal
 */
const readline = require("readline");

// stdin: entrada estándar (teclado), stdout: salida estándar (pantalla)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Solicitud asíncrona de entrada del usuario con callback
// El parámetro 'name' contiene la respuesta del usuario cuando presiona Enter
rl.question("Por favor, ingresa tu nombre: ", (name) => {
  // Captura de la fecha/hora actual del sistema en la zona horaria local
  const fechaActual = new Date();

  // Extracción de la hora en formato 24h (0-23)
  // getHours() devuelve la hora local del sistema, no UTC
  const hora = fechaActual.getHours();

  let saludo;

  // 5:00-11:59 -> Mañana | 12:00-18:59 -> Tarde | 19:00-4:59 -> Noche
  if (hora >= 5 && hora < 12) {
    saludo = "Buenos días";
  } else if (hora >= 12 && hora < 19) {
    saludo = "Buenas tardes";
  } else {
    saludo = "Buenas noches";
  }

  console.log(`${saludo}, ${name}!`);

  // Cierre explícito de la interfaz readline para terminar el proceso
  // Sin esto, el programa se quedaría esperando más entrada
  rl.close();
});
