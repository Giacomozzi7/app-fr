import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarImagenPageRoutingModule } from './agregar-imagen-routing.module';

import { AgregarImagenPage } from './agregar-imagen.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarImagenPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarImagenPage]
})
export class AgregarImagenPageModule {}
