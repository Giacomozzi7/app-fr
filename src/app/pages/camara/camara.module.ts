import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraPageRoutingModule } from './camara-routing.module';

import { CamaraPage } from './camara.page';
import { WebcamModule } from 'ngx-webcam';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraPageRoutingModule,
    WebcamModule,
    ComponentsModule
  ],
  declarations: [CamaraPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class CamaraPageModule {}
