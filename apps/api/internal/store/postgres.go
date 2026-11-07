package store

import (
	"context"
	"github.com/jackc/pgx/v5/pgxpool"
)

type Postgres struct{ Pool *pgxpool.Pool }

func (p Postgres) Disponible(ctx context.Context) error { return p.Pool.Ping(ctx) }
