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
  },  {
    path: 'modulo-educativo',
    loadChildren: () => import('./pages/modulo-educativo/modulo-educativo.module').then( m => m.ModuloEducativoPageModule)
  },
  {
    path: 'trivia',
    loadChildren: () => import('./pages/trivia/trivia.module').then( m => m.TriviaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
