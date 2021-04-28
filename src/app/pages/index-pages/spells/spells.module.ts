import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpellsPageRoutingModule } from './spells-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { SpellsPage } from './spells.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpellsPageRoutingModule,
    TranslateModule
  ],
  declarations: [SpellsPage]
})
export class SpellsPageModule {}
