/**
 * Programa de saludos multiidioma con argumentos por línea de comandos
 * Acepta nombre obligatorio y opción opcional de idioma (--idioma o -i)
 */

// Internacionalización de mensajes de saludos
const SALUDOS = {
  es: "¡Hola, {nombre}! Bienvenido/a a Node.js.",
  en: "Hello, {nombre}! Welcome to Node.js.",
  fr: "Bonjour, {nombre} ! Bienvenue à Node.js.",
};

function analizarArgumentos() {
  // process.argv = [node, archivo.js, ...argumentos]
  const args = process.argv.slice(2);

  let nombre = null;
  let idioma = "es"; // Idioma por defecto

  // Buscar argumentos de idioma primero para poder removerlos
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    // Verificar si es argumento de idioma (--idioma o -i)
    if (arg === "--idioma" || arg === "-i") {
      // El siguiente argumento debe ser el código de idioma
      if (i + 1 < args.length) {
        const codigoIdioma = args[i + 1];

        // Validar si el idioma es soportado
        if (SALUDOS[codigoIdioma]) {
          idioma = codigoIdioma;
        } else {
          console.log(
            `⚠️  Idioma '${codigoIdioma}' no es válido. Usando español por defecto.`
          );
        }

        // Remover tanto el flag como el valor del array
        args.splice(i, 2);
        break;
      } else {
        console.log("❌ Error: La opción de idioma requiere un valor.");
        process.exit(1);
      }
    }
  }

  // El primer argumento restante debe ser el nombre
  if (args.length > 0) {
    nombre = args[0];
  }

  return { nombre, idioma };
}

function validarNombre(nombre) {
  return nombre && nombre.trim().length > 0;
}

function generarSaludo(nombre, idioma) {
  const plantillaSaludo = SALUDOS[idioma];
  return plantillaSaludo.replace("{nombre}", nombre);
}

/**
 * Muestra mensaje de error para nombre obligatorio
 */
function mostrarErrorNombre() {
  console.log("❌ Error: El nombre es obligatorio.");
  console.log("\n📋 Uso correcto:");
  console.log("   node saludos.js <nombre> [--idioma|-i <código>]");
  console.log("\n💡 Ejemplos:");
  console.log("   node saludos.js Fernando -i en");
  console.log("   node saludos.js Fernando --idioma fr");
  console.log("   node saludos.js Fernando");
  console.log("\n🌍 Idiomas soportados: es, en, fr");
}

function main() {
  // Analizar argumentos de línea de comandos
  const { nombre, idioma } = analizarArgumentos();

  // Validar que el nombre sea proporcionado
  if (!validarNombre(nombre)) {
    mostrarErrorNombre();
    process.exit(1);
  }

  // Generar y mostrar saludo personalizado
  const saludo = generarSaludo(nombre, idioma);
  console.log(saludo);
}

// Ejecutar programa principal
main();
