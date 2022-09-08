import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header.component';
import { BtnfiltrosComponent } from './btnfiltros/btnfiltros.component';



@NgModule({
  declarations: [
    HeaderComponent,
    BtnfiltrosComponent
  ],
  exports: [
    HeaderComponent,
    BtnfiltrosComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
