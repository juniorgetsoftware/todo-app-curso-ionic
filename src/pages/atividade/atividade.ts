import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AtividadeProvider, Atividade } from './../../providers/atividade/atividade';

@IonicPage()
@Component({
  selector: 'page-atividade',
  templateUrl: 'atividade.html',
})
export class AtividadePage {

  atividade: Atividade;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private atividadeProvider: AtividadeProvider, private toastCtrl: ToastController) {
    if (this.navParams.data.atividade && this.navParams.data.key) {
      this.atividade = this.navParams.data.atividade;
      this.key =  this.navParams.data.key;
    } else {
      this.atividade = new Atividade();
    }
  }

  cadastrar() {
    this.salvarAtividade()
      .then(() => {
        this.toastCtrl.create({ message: 'Atividade cadastrada.', duration: 3000, position: 'bottom' }).present();
        this.navCtrl.pop();
      })
      .catch(() => {
        this.toastCtrl.create({ message: 'Erro ao cadastrar a atividade.', duration: 3000, position: 'bottom' }).present();
      });
  }

  private salvarAtividade() {
    if (this.key) {
      return this.atividadeProvider.update(this.key, this.atividade);
    } else {
      return this.atividadeProvider.insert(this.atividade);
    }
  }

  cancelar() {
    this.navCtrl.pop();
  }

}
