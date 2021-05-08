import { Injectable } from '@angular/core';
import {
  ModalController,
  LoadingController,
  ToastController
} from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private isLoading: any;
  options: LoadingOptions = {
    message: '<div class="loadbox"><div class="dice"></div></div>',
    cssClass: 'loader',
    translucent: true,
    showBackdrop: true,
    spinner: null,
    mode: 'md',
    keyboardClose: true
  };

  constructor(
    private modal: ModalController,
    private loading: LoadingController,
    private toast: ToastController
  ) { }

  public async showModal(modalPage: any, props = {}): Promise<any> {
    const modal = await this.modal.create({
      component: modalPage,
      componentProps: props  //{item:{}}
    });
    await modal.present();
    return await modal.onWillDismiss();
  }

  public async showLoading() {
    if (this.isLoading) {
      this.loading.dismiss();
    }
    this.isLoading = await this.loading.create(this.options);
    await this.isLoading.present();
  }

  public async hideLoading() {
    await this.loading.dismiss();
    this.isLoading = null;
  }
  public async showToast(msg: string, color: string) {
    const _toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: color
    });
    await _toast.present();
  }

}