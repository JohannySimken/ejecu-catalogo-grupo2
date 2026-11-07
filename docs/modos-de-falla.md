# Modos de falla de la base

| Falla                                  | Protección                         | Verificación                     |
| -------------------------------------- | ---------------------------------- | -------------------------------- |
| PostgreSQL caído                       | /readyz devuelve 503               | E2E con base detenida            |
| Configuración incompleta               | Proceso termina al arrancar        | E2E sin variables                |
| Publicación del contrato en producción | Docs desactivados                  | E2E en prod                      |
| API no disponible                      | Mensaje visible en microcomponente | Prueba del cliente ante HTTP 503 |

No hay endpoints de negocio todavía. Antes de agregarlos deben definirse permisos, JWT, persistencia, idempotencia y escenarios golden.
