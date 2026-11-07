import { afterEach, expect, it, vi } from 'vitest'
import { consultarEstado } from './estado-catalogo.api'
afterEach(() => vi.unstubAllGlobals())
it('envía credenciales al origen configurado y devuelve el estado', async () => {
  const peticion = vi
    .fn()
    .mockResolvedValue(new Response(JSON.stringify({ estado: 'base preparada' })))
  vi.stubGlobal('fetch', peticion)
  expect(await consultarEstado('https://catalogo.example')).toBe('base preparada')
  expect(peticion).toHaveBeenCalledWith('https://catalogo.example/api/estado', {
    credentials: 'include',
    signal: undefined,
  })
})
it('rechaza una respuesta fallida', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 503 })))
  await expect(consultarEstado('')).rejects.toThrow('No se pudo consultar')
})
