package service

type Estado struct {
	Servicio string `json:"servicio"`
	Estado   string `json:"estado"`
}

func ConsultarEstado() Estado { return Estado{Servicio: "catalogo", Estado: "base preparada"} }
