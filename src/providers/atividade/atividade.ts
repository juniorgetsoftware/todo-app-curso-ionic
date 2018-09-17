import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AtividadeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AtividadeProvider {

  constructor(private storage: Storage) {

  }

  public insert(atividade: Atividade) {
    let key = new Date().getMilliseconds().toString();
    return this.save(key, atividade);
  }

  public update(key: string, atividade: Atividade) {
    return this.save(key, atividade);
  }

  private save(key: string, atividade: Atividade) {
    return this.storage.set(key, atividade);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAll() {

    let atividades: AtividadeList[] = [];

    return this.storage.forEach((value: Atividade, key: string, iterationNumber: Number) => {
      let atividade = new AtividadeList();
      atividade.key = key;
      atividade.atividade = value;
      atividades.push(atividade);
    })
      .then(() => {
        return Promise.resolve(atividades);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export class Atividade {
  titulo: string;
  descricao: string;
  categoria: string;
  status: boolean;
}

export class AtividadeList {
  key: string;
  atividade: Atividade;
}
