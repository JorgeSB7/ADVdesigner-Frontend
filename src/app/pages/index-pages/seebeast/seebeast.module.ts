import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeebeastPageRoutingModule } from './seebeast-routing.module';

import { SeebeastPage } from './seebeast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeebeastPageRoutingModule
  ],
  declarations: [SeebeastPage]
})
export class SeebeastPageModule {}
