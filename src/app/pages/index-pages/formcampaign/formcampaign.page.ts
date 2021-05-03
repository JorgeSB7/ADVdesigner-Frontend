import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { campaign } from 'src/app/model/campaign';
import { user } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { ImageaddService } from 'src/app/services/imageadd.service';

@Component({
  selector: 'app-formcampaign',
  templateUrl: './formcampaign.page.html',
  styleUrls: ['./formcampaign.page.scss'],
})
export class FormcampaignPage {
  private campaign: campaign;
  private user: user;
  public mode: string;
  private form: FormGroup;

  constructor(private modal: ModalController,
    private formBuilder: FormBuilder,
    private navParams: NavParams,
    private gallery: ImageaddService,
    private auth: AuthService) {

      this.campaign = this.navParams.get('campaign');
      if (this.campaign && this.campaign.cdcam) {
        console.log(this.campaign);
        this.mode = 'Editing';
      } else {
        this.mode = 'Creating';
        this.campaign = {
          cdcam: '', // for autoincrement
          namecampaign: '',
          picture: '',
          description: '',
          contras: this.auth.getUser().id
        };
      }
  
      this.form = this.formBuilder.group({
        cdcam: new FormControl(this.campaign.cdcam),
        contras: new FormControl(this.auth.getUser().id),

        namecampaign: new FormControl(
          this.campaign.namecampaign,
          Validators.compose([Validators.required, Validators.maxLength(128)])
        ),
        
        description: new FormControl(
          this.campaign.description,
          Validators.compose([Validators.required])
        )
      });
    }
  
  submitForm() {
    let campaign=this.form.value
    campaign.picture=this.campaign.picture
    console.log(campaign)
    this.dismiss(campaign);
  }
  
  public dismiss(campaign: campaign) {
    this.modal.dismiss(campaign);
  }

  //___________________________________________IMG

  setImg(){
    this.gallery.getImage().then(result=>{
      this.campaign.picture=this.gallery.image
    }).catch(err=>{
      console.log(err)
    });
  }

}