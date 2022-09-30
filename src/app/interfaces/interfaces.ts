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
  tipo: string;
  zona: string;
  fecha: string;
}
