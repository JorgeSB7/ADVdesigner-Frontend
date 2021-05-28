import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { character } from 'src/app/model/character';
import { ApiCharacterService } from 'src/app/services/api-character.service';
import { UiService } from 'src/app/services/ui.service';
import { FormcharacterPage } from '../formcharacter/formcharacter.page';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
})
export class CharactersPage implements OnInit {
  public personajes: Array<character>;
  @ViewChild('input', { static: false }) myInput: IonSearchbar;

  constructor(private apiCha: ApiCharacterService,
    private ui: UiService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadAll();
  }

  //_____________________________________________________loadAll
  /**
   * Carga todos los personajes del usuario.
   */
  public async loadAll() {
    await this.ui.showLoading();
    try {
      this.personajes = await this.apiCha.getCharacter();
      await this.ui.hideLoading();
    } catch (err) {
      this.personajes = null; //vista
      await this.ui.hideLoading();
      Swal.fire({
        icon: 'info',
        title: 'Fallo del servidor',
        text: 'Deslice hacia abajo para recargar los registros. Disculpe las molestias.',
        footer: '<a href="mailto:ajosanchez@iesfranciscodelosrios.es">¿Necesita ayuda?</a>'
      });
    }
  }

  //_____________________________________________________removeCharacter
  /**
   * Borra el personaje elegido.
   * @param character recibe un personaje.
   */
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

  //_____________________________________________________searchCharacter
  /**
   * Busca por el nombre del personaje.
   * @param $event recibe una serie de caracteres.
   */
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

  //_____________________________________________________addCharacter
  /**
   * Abre el formulario para crear un nuevo persoje. Luego carga de nuevo todos los personajes del usuario.
   */
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

  //_____________________________________________________editCharacter
  /**
   * Abre el formulario para editar el personaje. 
   * @param _character recibe el personaje que se desea editar. Luego carga de nuevo todos los personajes con los cambios actualizados.
   */
  public async editCharacter(_character: character) {
    const characterToBeUpdated = await this.ui.showModal(FormcharacterPage, { character: _character });
    console.log(characterToBeUpdated.data);
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
  /**
   * Muestra una nueva página con información detallada del personaje.
   * @param character recibe un personaje.
   */
  public seecha(character: character) {
    this.apiCha.seePJ(character);
  }

  //__________________________________________________________ALERT DELETE
  /**
   * Muestra una alerta de seguridad para eliminar a un personaje. Si responde que si se llama al metodo de borrar.
   * @param character recibe un personaje.
   */
  async presentAlert(character: character) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar el personaje?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no asi que no hacemos nada
        }
      },
      {
        text: 'Confirmar',
        handler: () => {
          // Aqui borramos el sitio en la base de datos
          this.removeCharacter(character);
        }
      }]
    });

    await alert.present();
  }

  //____________________________CARGAR DATOS
  public cargaDatos($event = null) {
    try {
      this.loadAll()
      if ($event) {
        $event.target.complete();
      }
    } catch (err) {
      //Error
    }
  }
}
