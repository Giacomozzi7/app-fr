import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'memoria/:id',
    loadChildren: () => import('./pages/memoria/memoria.module').then( m => m.MemoriaPageModule)
  },
  {
    path: 'galeria/:id',
    loadChildren: () => import('./pages/galeria/galeria.module').then( m => m.GaleriaPageModule)
  },
  {
    path: 'camara/:id',
    /* path: 'camara', */
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'modulo-educativo',
    loadChildren: () => import('./pages/modulo-educativo/modulo-educativo.module').then( m => m.ModuloEducativoPageModule)
  },
  {
    path: 'trivia',
    loadChildren: () => import('./pages/trivia/trivia.module').then( m => m.TriviaPageModule)
  },
  {
    path: 'relatos/:id',
    loadChildren: () => import('./pages/relatos/relatos.module').then( m => m.RelatosPageModule)
  },
  {
    path: 'valoraciones/:id',
    loadChildren: () => import('./pages/valoraciones/valoraciones.module').then( m => m.ValoracionesPageModule)
  },
  {
    path: 'escenario/:id',
    loadChildren: () => import('./pages/escenario/escenario.module').then( m => m.EscenarioPageModule)
  },
  {
    path: 'comentarios/:id',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'agregar-comentario/:id/:type/:id_com',
    loadChildren: () => import('./pages/agregar-comentario/agregar-comentario.module').then( m => m.AgregarComentarioPageModule)
  },
  {
    path: 'agregar-imagen/:id/:type/:id_img',
    loadChildren: () => import('./pages/agregar-imagen/agregar-imagen.module').then( m => m.AgregarImagenPageModule)
  },
  {
    path: 'agregar-relato/:id/:type/:id_rel',
    loadChildren: () => import('./pages/agregar-relato/agregar-relato.module').then( m => m.AgregarRelatoPageModule)
  },
  {
    path: 'agregar-video/:id/:type/:id_vid',
    loadChildren: () => import('./pages/agregar-video/agregar-video.module').then( m => m.AgregarVideoPageModule)
  },
  {
    path: 'slides/:id',
    loadChildren: () => import('./pages/slides/slides.module').then( m => m.SlidesPageModule)
  },  {
    path: 'trivia-home',
    loadChildren: () => import('./pages/trivia-home/trivia-home.module').then( m => m.TriviaHomePageModule)
  }



  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
