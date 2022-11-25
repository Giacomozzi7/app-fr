import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarRelatoPage } from './agregar-relato.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarRelatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarRelatoPageRoutingModule {}
