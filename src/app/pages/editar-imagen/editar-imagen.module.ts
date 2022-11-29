import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarImagenPageRoutingModule } from './editar-imagen-routing.module';

import { EditarImagenPage } from './editar-imagen.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarImagenPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [EditarImagenPage]
})
export class EditarImagenPageModule {}
