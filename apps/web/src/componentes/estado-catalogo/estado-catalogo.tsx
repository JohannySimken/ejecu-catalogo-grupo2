import { useEstadoCatalogo } from './use-estado-catalogo'
export function EstadoCatalogo({ baseUrl }: { baseUrl: string }) {
  const estado = useEstadoCatalogo(baseUrl)
  return <p role="status">{estado}</p>
}
