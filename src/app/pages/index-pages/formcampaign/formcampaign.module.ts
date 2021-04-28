import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormcampaignPageRoutingModule } from './formcampaign-routing.module';

import { FormcampaignPage } from './formcampaign.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormcampaignPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [FormcampaignPage]
})
export class FormcampaignPageModule {}
