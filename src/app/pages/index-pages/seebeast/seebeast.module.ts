import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeebeastPageRoutingModule } from './seebeast-routing.module';

import { SeebeastPage } from './seebeast.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeebeastPageRoutingModule,
    TranslateModule
  ],
  declarations: [SeebeastPage]
})
export class SeebeastPageModule {}
