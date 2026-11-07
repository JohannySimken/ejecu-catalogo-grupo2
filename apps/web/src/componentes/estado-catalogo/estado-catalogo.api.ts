export async function consultarEstado(
  baseUrl: string,
  signal?: AbortSignal,
): Promise<string> {
  const respuesta = await fetch(`${baseUrl}/api/estado`, {
    signal,
    credentials: 'include',
  })
  if (!respuesta.ok) throw new Error('No se pudo consultar el catálogo')
  const datos: { estado: string } = await respuesta.json()
  return datos.estado
}
