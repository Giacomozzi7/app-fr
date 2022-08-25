import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MemoriaPageRoutingModule } from './memoria-routing.module';

import { MemoriaPage } from './memoria.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MemoriaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MemoriaPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MemoriaPageModule {}
