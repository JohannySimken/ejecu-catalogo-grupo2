import { readdirSync, readFileSync } from 'node:fs'
function revisar(ruta) {
  for (const archivo of readdirSync(ruta, { withFileTypes: true })) {
    const nombre = `${ruta}/${archivo.name}`
    if (archivo.isDirectory()) revisar(nombre)
    else if (
      /\.tsx?$/.test(nombre) &&
      !/\.(test|api)\.ts$/.test(nombre) &&
      /\bfetch\s*\(/.test(readFileSync(nombre, 'utf8'))
    )
      throw new Error(`fetch fuera de *.api.ts: ${nombre}`)
    if (
      archivo.isFile() &&
      /\.tsx?$/.test(nombre) &&
      /\b(localStorage|sessionStorage)\b/.test(readFileSync(nombre, 'utf8'))
    )
      throw new Error(`Almacenamiento de sesión prohibido: ${nombre}`)
  }
}
revisar('apps/web/src')
