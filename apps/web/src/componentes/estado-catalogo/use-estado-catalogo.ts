import { useEffect, useState } from 'react'
import { consultarEstado } from './estado-catalogo.api'
export function useEstadoCatalogo(baseUrl: string) {
  const [estado, establecerEstado] = useState('Consultando…')
  useEffect(() => {
    const controlador = new AbortController()
    consultarEstado(baseUrl, controlador.signal)
      .then(establecerEstado)
      .catch(() => {
        if (!controlador.signal.aborted) establecerEstado('Servicio no disponible')
      })
    return () => controlador.abort()
  }, [baseUrl])
  return estado
}
