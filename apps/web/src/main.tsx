import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EstadoCatalogo } from './componentes/estado-catalogo/estado-catalogo'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
      <h1>Catálogo · Grupo 2</h1>
      <EstadoCatalogo baseUrl="" />
    </main>
  </StrictMode>,
)
