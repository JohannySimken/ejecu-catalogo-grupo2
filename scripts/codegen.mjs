import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
mkdirSync('contracts', { recursive: true })
writeFileSync(
  'contracts/openapi.yaml',
  execFileSync('go', ['run', './cmd/api', 'openapi'], { cwd: 'apps/api' }),
)
execFileSync(
  process.execPath,
  [
    resolve('apps/web/node_modules/openapi-typescript/bin/cli.js'),
    '../../contracts/openapi.yaml',
    '-o',
    'src/api/schema.d.ts',
  ],
  { cwd: 'apps/web', stdio: 'inherit' },
)
