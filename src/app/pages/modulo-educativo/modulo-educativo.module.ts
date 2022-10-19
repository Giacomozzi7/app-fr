import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModuloEducativoPageRoutingModule } from './modulo-educativo-routing.module';

import { ModuloEducativoPage } from './modulo-educativo.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModuloEducativoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ModuloEducativoPage]
})
export class ModuloEducativoPageModule {}
