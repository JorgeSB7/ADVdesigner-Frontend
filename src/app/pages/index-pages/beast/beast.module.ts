import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeastPageRoutingModule } from './beast-routing.module';

import { BeastPage } from './beast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeastPageRoutingModule
  ],
  declarations: [BeastPage]
})
export class BeastPageModule {}
