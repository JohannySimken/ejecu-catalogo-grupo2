import { execFileSync } from 'node:child_process'
const pendientes = execFileSync('gofmt', ['-l', 'apps/api', 'apps/web/server'], {
  encoding: 'utf8',
}).trim()
if (pendientes) throw new Error(`Ejecuta gofmt en: ${pendientes}`)
execFileSync('go', ['vet', './...'], { cwd: 'apps/api', stdio: 'inherit' })
