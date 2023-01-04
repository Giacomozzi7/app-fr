import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TriviaHomePageRoutingModule } from './trivia-home-routing.module';

import { TriviaHomePage } from './trivia-home.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TriviaHomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [TriviaHomePage]
})
export class TriviaHomePageModule {}
