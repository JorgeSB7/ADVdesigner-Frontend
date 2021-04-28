import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CharactersPageRoutingModule } from './characters-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { CharactersPage } from './characters.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CharactersPageRoutingModule,
    TranslateModule
  ],
  declarations: [CharactersPage]
})
export class CharactersPageModule {}
