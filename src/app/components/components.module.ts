import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { LeyendaComponent } from './leyenda/leyenda.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { CardComponent } from './card/card.component';
import { DatosInteresComponent } from './datos-interes/datos-interes.component';
import { SwiperModule } from 'swiper/angular';
import { ModalBrujulaComponent } from './modal-brujula/modal-brujula.component';
import { ListenerComponent } from './listener/listener.component';
import { CardResumenComponent } from './card-resumen/card-resumen.component';
import { LikeComponent } from './like/like.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent,
    CardComponent,
    DatosInteresComponent,
    ModalBrujulaComponent,
    ListenerComponent,
    CardResumenComponent,
    LikeComponent
  ],
  exports: [
    HeaderComponent,
    LeyendaComponent,
    FiltrosComponent,
    CardComponent,
    DatosInteresComponent,
    ModalBrujulaComponent,
    ListenerComponent,
    CardResumenComponent,
    LikeComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SwiperModule
  ]
})
export class ComponentsModule { }
