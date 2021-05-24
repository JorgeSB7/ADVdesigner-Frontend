import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { campaign } from 'src/app/model/campaign';
import { AuthService } from 'src/app/services/auth.service';
import { ReadService } from 'src/app/services/read.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2'
import { ToolsPage } from '../../menu-pages/tools/tools.page';
import { MusicPage } from '../../menu-pages/music/music.page';

@Component({
  selector: 'app-seecampaign',
  templateUrl: './seecampaign.page.html',
  styleUrls: ['./seecampaign.page.scss'],
})
export class SeecampaignPage implements OnInit {
  @Input("campaign") campaign: campaign;
  private text: string;
  private iduser = this.auth.getUser().id;
  private urlSafeC: SafeResourceUrl;

  public centesimas: number = 0;
  public minutos: number = 0;
  public segundos: number = 0;
  public contador: any;

  public _centesimas: string = '00';
  public _minutos: string = '00';
  public _segundos: string = '00';

  isRun = false;
  estado: string = 'play';
  refreshColor = 'danger';
  constructor(private modalController: ModalController, private readh: ReadService,
    private auth: AuthService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log(this.iduser);
    console.log(this.campaign.contras);

    this.urlSafeC= this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/xTAsubnhngY");
  }

  // Cierra el modal
  public exit() {
    this.modalController.dismiss();
  }

  /**
   * Reproduce la descripcion de la campaña
   */
  repro(){
    this.text = this.campaign.description
    this.readh.talk(this.text);
  }

  //_____________________________________________CRONOMETRO
  // Control de los botones del cronometro
  estadoSwap() {
    this.isRun = !this.isRun;
    if (this.isRun) {
      this.estado = 'pause';
      this.refreshColor = 'danger';
      this.start();
    } else {
      this.estado = 'play';
      this.refreshColor = 'gris';
      this.pause();
    }
  }

  // Comienza el cronometro
  start() {
    this.contador = setInterval(() => {
      this.centesimas += 1;
      if (this.centesimas < 10) this._centesimas = '0' + this.centesimas;
      else this._centesimas = '' + this.centesimas;
      if (this.centesimas == 10) {
        this.centesimas = 0;
        this.segundos += 1;
        if (this.segundos < 10) this._segundos = '0' + this.segundos;
        else this._segundos = this.segundos + '';
        if (this.segundos == 60) {
          this.segundos = 0;
          this.minutos += 1;
          if (this.minutos < 10) this._minutos = '0' + this.minutos;
          else this._minutos = this.minutos + '';
          this._segundos = '00';
          if (this.minutos == 240) {
            this.pause();
            Swal.fire({
              icon: 'info',
              title: 'Deja dormir al dragón...',
              text: 'La sesión de juego lleva 4 horas abierta. Toca descansar.',
              //footer: '<a href>Why do I have this issue?</a>'
              imageUrl: 'assets/imgs/Sdragon.jpg',
              background: '#f8f8f8'
            });
          }
        }
      }
    }, 100)
  }

  // Pausa el cronometro
  pause() {
    clearInterval(this.contador);
  }
  
  // Reinicia el cronometro
  stop() {
    if (!this.isRun) {
      clearInterval(this.contador);
      this.minutos = 0;
      this.segundos = 0;
      this.centesimas = 0;

      this._centesimas = '00';
      this._segundos = '00';
      this._minutos = '00';

      this.estado = 'play';
      this.isRun = false;
      this.contador = null;
    }
  }

  //________________________________________BOTONES

  // Abre un modal a herramientas
  async seeTools() {
    const modal = await this.modalController.create({
      component: ToolsPage,
      cssClass: 'my-custom-class',
      componentProps:
        { value: 123 }
    });
    return await modal.present();
  }

  // Abre un modal a herramientas
  async seeMusic() {
    const modal = await this.modalController.create({
      component: MusicPage,
      cssClass: 'my-custom-class',
      componentProps:
        { value: 123 }
    });
    return await modal.present();
  }
}