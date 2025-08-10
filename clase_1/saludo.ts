/**
 * Script de saludo personalizado basado en la hora del día
 * Versión TypeScript
 */

// Importación ES6 modules de la API readline de Node.js
// TypeScript permite esta sintaxis que se compila a CommonJS
import * as readline from "readline";

// stdin: entrada estándar (teclado), stdout: salida estándar (pantalla)
const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Solicitud asíncrona de entrada del usuario con callback tipado
// El parámetro 'name' tiene tipo String explícito para validación en compilación
rl.question("Por favor, ingresa tu nombre: ", (name: string) => {
  // Captura de la fecha/hora actual del sistema en la zona horaria local
  const fechaActual: Date = new Date();

  // Extracción de la hora en formato 24h (0-23)
  // getHours() devuelve number, TypeScript infiere el tipo automáticamente
  const hora: number = fechaActual.getHours();

  let saludo: string;

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
