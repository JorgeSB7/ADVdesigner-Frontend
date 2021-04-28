import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { character } from 'src/app/model/character';
import { ApiCharacterService } from 'src/app/services/api-character.service';
import { UiService } from 'src/app/services/ui.service';
import { FormcharacterPage } from '../formcharacter/formcharacter.page';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  public personajes: Array<character>;
  @ViewChild('input', {static: false}) myInput: IonSearchbar ;

  constructor(private apiCha:ApiCharacterService,
    private ui:UiService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadAll();
  }

  //________________________________________________loadAll
  public async loadAll() {
    await this.ui.showLoading();
    try {
      this.personajes = await this.apiCha.getCharacter();
      await this.ui.hideLoading();
    } catch (err) {
      this.personajes = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //________________________________________________removeCharacter
  public async removeCharacter(character: character) {
    await this.ui.showLoading();
    this.apiCha
      .removeCharacter(character)
      .then(async d => await this.loadAll())
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }

  //________________________________________________searchCharacter
  public async searchCharacter($event) {
    console.log($event);
    let value = $event.detail.value;
    console.log(value);
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.apiCha.searchByName(value)
      .then(d => {
        this.personajes = d;
      })
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
       // await this.ui.hideLoading();
       // this.myInput.setFocus();
      });
    } else {
      await this.loadAll();
    }
  }

  //________________________________________________addCharacter
  public async addCharacter() {
    const characterToBeAdd = await this.ui.showModal(FormcharacterPage, { character: {} });
    console.log(characterToBeAdd);
    try {
      if (characterToBeAdd.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.apiCha.createCharacter(characterToBeAdd.data);
        await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //________________________________________________editCharacter
  public async editCharacter(_character: character) {
    const characterToBeUpdated = await this.ui.showModal(FormcharacterPage, { character : _character });
    try {
      if (characterToBeUpdated.data) {
        console.log(_character);
        // si no cierra
        await this.ui.showLoading();
        await this.apiCha.updateCharacter(characterToBeUpdated.data);
        await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //__________________________________________________________AMPLIAR PERSONAJE
  public seecha(character: character){
    this.apiCha.seePJ(character);
  }
  
  //__________________________________________________________ALERT DELETE
  async presentAlert(character: character) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar el personaje?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          // AquÍ borramos el sitio en la base de datos
          this.removeCharacter(character);
        }
      }]
    });

    await alert.present();
  }
}
