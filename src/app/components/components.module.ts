import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { LeyendaComponent } from './leyenda/leyenda.component';
import { FiltrosComponent } from './filtros/filtros.component';




@NgModule({
  declarations: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent
  ],
  exports: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
