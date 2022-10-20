import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuloEducativoPage } from './modulo-educativo.page';

const routes: Routes = [
  {
    path: '',
    component: ModuloEducativoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuloEducativoPageRoutingModule {}
