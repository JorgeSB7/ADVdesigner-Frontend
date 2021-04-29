import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormbeastPageRoutingModule } from './formbeast-routing.module';

import { FormbeastPage } from './formbeast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormbeastPageRoutingModule
  ],
  declarations: [FormbeastPage]
})
export class FormbeastPageModule {}
