import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormcharacterPage } from './formcharacter.page';

const routes: Routes = [
  {
    path: '',
    component: FormcharacterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormcharacterPageRoutingModule {}
