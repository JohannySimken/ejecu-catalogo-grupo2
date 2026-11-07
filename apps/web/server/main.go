package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func main() {
	destino, err := url.Parse(os.Getenv("BACKEND_URL"))
	if err != nil || destino.Host == "" {
		log.Fatal("BACKEND_URL inválido")
	}
	proxy := httputil.NewSingleHostReverseProxy(destino)
	proxy.Transport = &http.Transport{ResponseHeaderTimeout: 5 * time.Second}
	archivos := http.FileServer(http.Dir("/srv"))
	mux := http.NewServeMux()
	mux.Handle("/api/", proxy)
	mux.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) { w.WriteHeader(200) })
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		if strings.HasPrefix(r.URL.Path, "/assets/") {
			w.Header().Set("Cache-Control", "public, max-age=31536000, immutable")
		} else {
			w.Header().Set("Cache-Control", "no-cache")
		}
		ruta := filepath.Join("/srv", filepath.Clean("/"+r.URL.Path))
		if _, err := os.Stat(ruta); os.IsNotExist(err) && !strings.HasPrefix(r.URL.Path, "/assets/") {
			http.ServeFile(w, r, "/srv/index.html")
			return
		}
		archivos.ServeHTTP(w, r)
	})
	servidor := http.Server{Addr: ":8080", Handler: mux, ReadHeaderTimeout: 5 * time.Second, WriteTimeout: 15 * time.Second}
	log.Fatal(servidor.ListenAndServe())
}
