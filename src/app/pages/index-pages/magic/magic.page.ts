import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { magic } from 'src/app/model/magic';
import { ApiMagicService } from 'src/app/services/api-magic.service';
import { UiService } from 'src/app/services/ui.service';
import { FormmagicPage } from '../formmagic/formmagic.page';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-magic',
  templateUrl: './magic.page.html',
  styleUrls: ['./magic.page.scss'],
})
export class MagicPage implements OnInit {
  public conjuros: Array<magic>;
  @ViewChild('input', { static: false }) myInput: IonSearchbar;

  constructor(private apiMag: ApiMagicService,
    private ui: UiService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadAll();
  }

  //________________________________________________loadAll
  /**
   * Carga todos los conjuros del usuario.
   */
  public async loadAll() {
    await this.ui.showLoading();
    try {
      this.conjuros = await this.apiMag.getMagic();
      await this.ui.hideLoading();
    } catch (err) {
      this.conjuros = null; //vista
      await this.ui.hideLoading();
      Swal.fire({
        icon: 'info',
        title: 'Fallo del servidor',
        text: 'Deslice hacia abajo para recargar los registros. Disculpe las molestias.',
        footer: '<a href="mailto:ajosanchez@iesfranciscodelosrios.es">¿Necesita ayuda?</a>'
      });
    }
  }

  //________________________________________________removeMagic
  /**
   * Borra el conjuro seleccionado.
   * @param magic recibe un conjuro.
   */
  public async removeMagic(magic: magic) {
    await this.ui.showLoading();
    this.apiMag
      .removeMagic(magic)
      .then(async d => await this.loadAll())
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }

  //________________________________________________searchMagic
  /**
   * Busca por el nombre del conjuro.
   * @param $event recibe una serie de caracteres.
   */
  public async searchMagic($event) {
    console.log($event);
    let value = $event.detail.value;
    console.log(value);
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.apiMag.searchByName(value)
        .then(d => {
          this.conjuros = d;
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

  //________________________________________________addMagic
  /**
   * Abre el formulario para crear un nuevo conjuro. Luego carga de nuevo todos los conjuros del usuario.
   */
  public async addMagic() {
    const magicToBeAdd = await this.ui.showModal(FormmagicPage, { magic: {} });
    console.log(magicToBeAdd);
    try {
      if (magicToBeAdd.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.apiMag.createMagic(magicToBeAdd.data);
        await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //________________________________________________editMagic
  /**
   * Abre el formulario para editar un conjuro.
   * @param _magic recibe el conjuro que se desea editar. Luego carga de nuevo todos los conjuros con los cambios actualizados.
   */
  public async editMagic(_magic: magic) {
    const magicToBeUpdated = await this.ui.showModal(FormmagicPage, { magic: _magic });
    try {
      if (magicToBeUpdated.data) {
        console.log(_magic);
        // si no cierra
        await this.ui.showLoading();
        await this.apiMag.updateMagic(magicToBeUpdated.data);
        await this.loadAll();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //__________________________________________________________AMPLIAR CONJURO
  /**
   * Muestra una nueva página con información detallada del conjuro.
   * @param magic recibe un conjuro.
   */
  public seecha(magic: magic) {
    this.apiMag.seePJ(magic);
  }

  //__________________________________________________________ALERT DELETE
  /**
   * Muestra una alerta de seguridad para eliminar a un conjuro. Si responde que si se llama al metodo de borrar.
   * @param magic recibe un conjuro.
   */
  async presentAlert(magic: magic) {
    const alert = await this.alertController.create({
      header: '¿Desea eliminar el conjuro?',
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
          this.removeMagic(magic);
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
