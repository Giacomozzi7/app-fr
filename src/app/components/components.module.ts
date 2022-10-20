import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { LeyendaComponent } from './leyenda/leyenda.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { CardComponent } from './card/card.component';




@NgModule({
  declarations: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent,
    CardComponent
  ],
  exports: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
