import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeemagicPage } from './seemagic.page';

const routes: Routes = [
  {
    path: '',
    component: SeemagicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeemagicPageRoutingModule {}
