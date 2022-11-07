export interface Marker {
  id:           string;
  escenario_id: string;
  categoria:    string;
  titulo:       string;
  descripcion:  string;
  zona:         string;
  fecha:        string;
  pos_evento:   PosEvento;
}

export interface PosEvento {
  lat: number;
  lng: number;
  alt: number;
}

export interface Track{
  name:         string;
  path:         string;
  fecha_subida: string;
  usuario_id:   string;
  likes :       string[];
}

export interface DatosInteres {
  interes_id:  string;
  titulo:      string;
  imagen_url:  string;
  descripcion: string;
}

export interface Escenario{
  id:            string;
  titulo:        string;
  descrip_corta: string;
  descripcion:   string;
  ciudades:      string[];
  slides:        EscenarioSlide[]
}

export interface EscenarioSlide{
  titulo:  string;
  img_url: string;
  fecha:   string;
}

