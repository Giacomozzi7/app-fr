import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TriviaHomePage } from './trivia-home.page';

const routes: Routes = [
  {
    path: '',
    component: TriviaHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TriviaHomePageRoutingModule {}
