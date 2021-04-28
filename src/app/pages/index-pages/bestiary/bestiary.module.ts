import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BestiaryPageRoutingModule } from './bestiary-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { BestiaryPage } from './bestiary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestiaryPageRoutingModule,
    TranslateModule
  ],
  declarations: [BestiaryPage]
})
export class BestiaryPageModule {}
