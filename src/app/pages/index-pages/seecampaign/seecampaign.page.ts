import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ModalController } from '@ionic/angular';
import { campaign } from 'src/app/model/campaign';
import { AuthService } from 'src/app/services/auth.service';
import { ReadService } from 'src/app/services/read.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
}