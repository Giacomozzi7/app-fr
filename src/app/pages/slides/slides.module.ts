import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SlidesPageRoutingModule } from './slides-routing.module';

import { SlidesPage } from './slides.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SwiperModule } from 'swiper/angular';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImageModule,
    SlidesPageRoutingModule,
    ComponentsModule,
    SwiperModule
  ],
  declarations: [SlidesPage]
})
export class SlidesPageModule {}
