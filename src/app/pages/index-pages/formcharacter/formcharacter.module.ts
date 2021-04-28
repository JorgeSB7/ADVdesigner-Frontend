import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormcharacterPageRoutingModule } from './formcharacter-routing.module';

import { FormcharacterPage } from './formcharacter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormcharacterPageRoutingModule
  ],
  declarations: [FormcharacterPage]
})
export class FormcharacterPageModule {}
