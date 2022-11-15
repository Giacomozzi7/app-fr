import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarComentarioPageRoutingModule } from './agregar-comentario-routing.module';

import { AgregarComentarioPage } from './agregar-comentario.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarComentarioPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [AgregarComentarioPage]
})
export class AgregarComentarioPageModule {}
