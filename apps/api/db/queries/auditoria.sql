-- name: RegistrarAuditoria :exec
INSERT INTO auditoria (id, actor, accion) VALUES ($1, $2, $3);
