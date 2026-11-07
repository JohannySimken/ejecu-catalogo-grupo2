-- +goose Up
CREATE TABLE auditoria (
 id uuid PRIMARY KEY,
 actor text NOT NULL,
 accion text NOT NULL,
 fecha timestamptz NOT NULL DEFAULT now()
);
-- +goose Down
DROP TABLE auditoria;
