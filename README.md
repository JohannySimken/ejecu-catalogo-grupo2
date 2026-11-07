# CatÃ¡logo Â· Grupo 2

Base de trabajo construida desde las reglas del DAS. No es una plantilla oficial entregada por el curso ni implementa todavÃ­a el dominio del catÃ¡logo.

## Requisitos

Go 1.26.5, Node 22.22.0, pnpm 10.13.1, Docker Desktop iniciado y Gitleaks 8.30.1. Las versiones del DAS se mantienen exactas.

## PreparaciÃ³n

```sh
pnpm install --frozen-lockfile
pnpm exec lefthook install
cd apps/api
go mod download
cd ../..
```

Copiar `.env.example` a `.env`, reemplazar usuario, contraseÃ±a, base y URLs. Los valores de DATABASE_URL deben coincidir con POSTGRES_USER, POSTGRES_PASSWORD y POSTGRES_DB. No subir `.env` al repositorio.

```sh
docker compose up -d --build
```

Web: http://localhost:5120. API: http://localhost:5121. DocumentaciÃ³n: http://localhost:5121/api/docs. Los puertos 5120/5121 son provisionales: confirmar el nÃºmero N del servicio con el profesor.

## ValidaciÃ³n

```sh
pnpm verify
pnpm codegen
pnpm test:e2e:api
```

El E2E usa un contenedor PostgreSQL efÃ­mero o `TEST_DATABASE_URL`, inicia el binario real y compara un reporte golden. Es una prueba de infraestructura; los escenarios de negocio se agregarÃ¡n cuando se conozca el contrato. La cobertura Go se obtiene del binario compilado con `-cover` y la del frontend de Vitest.

`pnpm codegen` genera `contracts/openapi.yaml` y `apps/web/src/api/schema.d.ts`; ambos se commitean. `make generate` en `apps/api` genera el repositorio SQL con sqlc. Handler â†’ Service â†’ Store es la estructura de las futuras funciones de negocio. `/api/estado` solo informa el estado de esta base; no expone datos del catÃ¡logo.

## GitHub y SonarQube

La CI exige `calidad`, `seguridad` e `imagen`. No se omite SonarQube si faltan sus secrets: calidad quedarÃ¡ bloqueado hasta configurar el proyecto. Ver `docs/solicitud-sonarqube.md`.

DespuÃ©s del primer push, configurar protecciÃ³n de `main`: PR obligatorio, al menos una aprobaciÃ³n de otra persona y los tres checks requeridos. No habilitar bypass para integrar PR con fallas.

## Pendientes del Hito 0

- Confirmar nÃºmero del servicio, alcance y dependencias con el documento de componentes.
- Crear SonarQube y cargar SONAR_TOKEN y SONAR_HOST_URL directamente en GitHub Actions Secrets.
- Confirmar la clave SonarQube propuesta y definir New Code y Quality Gate.
- Agregar seed cuando exista esquema de catÃ¡logo y app de desarrollo con mocks MSW.
- Completar autenticaciÃ³n JWT/JWKS, permisos y logs por request antes de agregar endpoints de negocio.
- PublicaciÃ³n del paquete UI, SBOM y firma de imÃ¡genes pendiente.
- Ejecutar Docker, escÃ¡neres y pipeline; guardar los enlaces de evidencia y proteger main.

Reglas completas: [DAS](docs/DAS.md). Modos de falla: [documento](docs/modos-de-falla.md).
