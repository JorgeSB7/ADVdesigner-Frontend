import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeastPageRoutingModule } from './beast-routing.module';

import { BeastPage } from './beast.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeastPageRoutingModule,
    TranslateModule
  ],
  declarations: [BeastPage]
})
export class BeastPageModule {}
