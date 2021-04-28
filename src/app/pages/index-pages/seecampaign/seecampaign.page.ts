import { Component, Input, OnInit } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { ModalController } from '@ionic/angular';
import { campaign } from 'src/app/model/campaign';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-seecampaign',
  templateUrl: './seecampaign.page.html',
  styleUrls: ['./seecampaign.page.scss'],
})
export class SeecampaignPage implements OnInit {
  @Input("campaign") campaign: campaign;
  text: string;

  constructor(private modalController: ModalController, private readh: ReadService) { }

  ngOnInit() {
  }

  public exit() {
    this.modalController.dismiss();
  }

  repro(){
    this.text = this.campaign.description
    this.readh.talk(this.text);
  }
}