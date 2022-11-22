export interface Marker {
  id: string;
  escenario_id: string;
  categoria: string;
  titulo: string;
  descripcion: string;
  zona: string;
  fecha: string;
  pos_evento: PosEvento;
}

export interface PosEvento {
  lat: number;
  lng: number;
  alt: number;
}

export interface Track {
  name: string;
  path: string;
  fecha_subida: string;
  usuario_id: string;
  likes: string[];
}

export interface DatosInteres {
  interes_id: string;
  titulo: string;
  imagen_url: string;
  descripcion: string;
}

export interface Escenario {
  id: string;
  titulo: string;
  short_descrip: string;
  long_descrip: string;
  ciudades: string[];
  slides: EscenarioSlide[];
  lat_lng: LatLngEscenario[];
}

export interface EscenarioSlide {
  titulo: string;
  img_url: string;
  fecha: string;
}

export interface LatLngEscenario {
  lat: number;
  lng: number;
}

export interface Comentarios {
  titulo: string;
  contenido: string;
  fecha_subida: string;
  usuario_id: string;
  comentario_id: string;
  likes: string[];
  aceptado: boolean;
  usuario_name?: string;
}

export interface Galeria {
  contenido: string;
  fecha_subida: string;
  usuario_id: string;
  galeria_id: string;
  likes: string[];
  tipo: string;
  descripcion: string;
  aceptado: boolean;
  usuario_name?: string;

}

export interface ValUser {
  usuario_id: string;
  val_interes: number;
  val_inmersion: number;
  fecha_val: string;
}
