import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemoriaPage } from './memoria.page';

const routes: Routes = [
  {
    path: '',
    component: MemoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoriaPageRoutingModule {}
