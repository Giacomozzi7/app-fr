import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { LeyendaComponent } from './leyenda/leyenda.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { CardComponent } from './card/card.component';
import { DatosInteresComponent } from './datos-interes/datos-interes.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent,
    CardComponent,
    DatosInteresComponent,
  ],
  exports: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent,
    CardComponent,
    DatosInteresComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule
  ]
})
export class ComponentsModule { }
