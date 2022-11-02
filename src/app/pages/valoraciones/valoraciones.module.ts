import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValoracionesPageRoutingModule } from './valoraciones-routing.module';

import { ValoracionesPage } from './valoraciones.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValoracionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ValoracionesPage]
})
export class ValoracionesPageModule {}
