import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { LeyendaComponent } from './leyenda/leyenda.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { CardComponent } from './card/card.component';
import { DatosInteresComponent } from './datos-interes/datos-interes.component';
import { ModalEscenarioComponent } from './modal-escenario/modal-escenario.component';
import { SwiperModule } from 'swiper/angular';



@NgModule({
  declarations: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent,
    CardComponent,
    DatosInteresComponent,
    ModalEscenarioComponent
  ],
  exports: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent,
    CardComponent,
    DatosInteresComponent,
    ModalEscenarioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule
  ]
})
export class ComponentsModule { }
