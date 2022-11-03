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
  name:string;
  path: string;
  fecha_subida: string;
  usuario_id: string;
  likes : string[];
}


