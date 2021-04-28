import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeecampaignPage } from './seecampaign.page';

const routes: Routes = [
  {
    path: '',
    component: SeecampaignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeecampaignPageRoutingModule {}
