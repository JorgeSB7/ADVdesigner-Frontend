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
  private aux = 1;
  private aux2 = 0;
  private resultEND: any;

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
  /**
   * La función determina cuantos dados se van a lanzar. Si recibe "more" aumenta y si 
   recibe "less" disminuye. El valor nunca sera menor a 1.
   * @param ax recibe un string.
   */
  numberDices(ax: string) {
    if (ax == "more") {
      this.aux += 1;
    } else if (ax == "less") {
      if (this.aux > 1) {
        this.aux -= 1
      } else {
        this.aux = 1;
      }
    } else {
      console.log("error");
    }
  }

  /**
   * La función suma o resta un valor al resultado final del lanzamiento de un dado. Si recibe 
   "more" aumenta y si recibe "less" disminuye. El valor por defecto siempre sera a 0.
   * @param ax 
   */
  MMDices(ax: string) {
    if (ax == "more") {
      this.aux2 += 1;
    } else if (ax == "less") {
      this.aux2-= 1
    } else {
      console.log("error");
    }
  }

  /**
   * Simula el lanzamiento de un dado. El resultado estara comprendido entre 1 y el valor maximo del dado seleccionado.
   Se aplica el numero de dados lanzados y la suma de un valor deseado.
   * @param dado recibe el valor máximo que puede alcanzar el dado seleccionado.
   */
  async dado(dado) {
    this.resultEND = 0;
    for (let index = 0; index < this.aux; index++) {
      this.result = this.randomIntFromInterval(1, dado);
      this.resultEND = await this.resultEND + this.result;
    }
    this.resultEND = this.resultEND + this.aux2;
    await this.diceToast(this.resultEND.toString());
  }

  //_____________________________________EVENTS/TREASURES
  /**
   * Selecciona un evento aletorio y los muestra por pantalla.
   * @param result 
   */
  generateEvents(result) {
    result = this.randomIntFromInterval(0, 5);
    this.events = ["HISTORIA", "MISIÓN", "MAZMORRA", "COMBATE", "ALDEA", "VIAJE"];
    this.event = this.events[result],
      this.oToast(this.event);
  }

  /**
   * Selecciona un tesoro aletorio y los muestra por pantalla.
   * @param result 
   */
  generateTreasures(result) {
    result = this.randomIntFromInterval(0, 7);
    this.treasures = ["ORO", "OBJETO MÁGICO", "ARMA", "ARMADURA", "ALIADO", "NADA", "MALDICIÓN", "MAPA"];
    this.treasure = this.treasures[result],
      this.oToast(this.treasure);
  }

}
