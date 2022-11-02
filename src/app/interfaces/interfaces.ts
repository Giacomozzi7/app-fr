export interface Marker {
  id: string;
  pos_camara: {
    lat: number;
    lng: number;
  };
  pos_evento:{
    lat:number;
    lng:number;
    alt:number;
  }
  camera_pose:{
    head:number;
    pidch: number;
    roll: number;
  }
  titulo: string;
  descripcion: string;
  categoria: string;
  zona: string;
  fecha: string;
}

export interface Track{
  name:string;
  path: string;
  fecha_subida: string;
  usuario_id: string;
  likes : string[];
}


