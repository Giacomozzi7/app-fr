import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarRelatoPageRoutingModule } from './agregar-relato-routing.module';

import { AgregarRelatoPage } from './agregar-relato.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarRelatoPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarRelatoPage]
})
export class AgregarRelatoPageModule {}
