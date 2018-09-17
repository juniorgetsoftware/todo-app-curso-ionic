import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AtividadeProvider, AtividadeList} from './../../providers/atividade/atividade';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  atividades: AtividadeList[];

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, private atividadeProvider: AtividadeProvider) {

  }

  ionViewDidEnter() {
    this.atividadeProvider.getAll()
      .then((result) => {
        this.atividades = result;
      });
  }

  goToAtividadePage() {
    this.navCtrl.push('AtividadePage');
  }

  editarAtividade(atividade: AtividadeList) {
    this.navCtrl.push('AtividadePage', { key: atividade.key, atividade: atividade.atividade });
  }

  removerAtividade(atividade: AtividadeList) {
    this.atividadeProvider.remove(atividade.key)
      .then(() => {
        // Removendo do array de items
        var index = this.atividades.indexOf(atividade);
        this.atividades.splice(index, 1);
        this.toastCtrl.create({ message: 'Atividade removida.', duration: 3000, position: 'botton' }).present();
      })
  }

}
