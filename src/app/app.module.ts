import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
              {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
               Geolocation,
              ScreenOrientation],
  bootstrap: [AppComponent],
})
export class AppModule {}
//{provide:ScreenOrientation, useClass: ScreenOrientationMock}],