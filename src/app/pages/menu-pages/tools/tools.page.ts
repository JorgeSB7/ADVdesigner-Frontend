import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.page.html',
  styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {
  private result;
  private events: string[];
  private event: string;
  private treasures: string[];
  private treasure: string;

  constructor(public ui: UiService,
    private toast: ToastController) { }

  ngOnInit() {
  }

  public async diceToast(msg: string) {
    const _toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'middle',
      cssClass: 'dT',

    });
    await _toast.present();
  }

  public async oToast(msg: string) {
    const _toast = await this.toast.create({
      message: msg,
      duration: 1000,
      position: 'middle',
      cssClass: 'oT',

    });
    await _toast.present();
  }

  randomIntFromInterval(min, max) { // min and max included
    this.result = Math.floor(Math.random() * (max - min + 1) + min);
    return this.result;
  }

  //_____________________________________DICE

  dice4 (result) {
    result = this.randomIntFromInterval(1, 4);
    this.diceToast(result);
  }

  dice6 (result) {
    result = this.randomIntFromInterval(1, 6);
    this.diceToast(result);
  }

  dice8 (result) {
    result = this.randomIntFromInterval(1, 8);
    this.diceToast(result);
  }

  dice10 (result) {
    result = this.randomIntFromInterval(1, 10);
    this.diceToast(result);
  }

  dice12 (result) {
    result = this.randomIntFromInterval(1, 12);
    this.diceToast(result);
  }

  dice20 (result) {
    result = this.randomIntFromInterval(1, 20);
    this.diceToast(result);
  }
  
  //_____________________________________EVENTS/TREASURES
  
  generateEvents(result){
    result = this.randomIntFromInterval(0, 5);
    this.events = ["HISTORIA", "MISIÓN", "MAZMORRA", "COMBATE", "ALDEA", "VIAJE"];
    this.event = this.events [result],
    this.oToast(this.event);
  }

  generateTreasures(result){
    result = this.randomIntFromInterval(0, 7);
    this.treasures = ["ORO", "OBJETO MÁGICO", "ARMA", "ARMADURA", "ALIADO", "NADA", "MALDICIÓN", "MAPA"];
    this.treasure = this.treasures [result],
    this.oToast(this.treasure);
  }

}
