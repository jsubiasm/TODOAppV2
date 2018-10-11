import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TodoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoServiceProvider {

  constructor(public http: HttpClient) {
  }

  getNotas(usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/getNotas';
    url = url + '?usuarioId=' + usuarioId.trim();
    return this.http.get(url);
  }

  getUltimaNota(usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/getUltimaNota';
    url = url + '?usuarioId=' + usuarioId.trim();
    return this.http.get(url);
  }

  insertNota(notaNumeroOrden, notaTexto, usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/insertNota';
    return this.http.post(url, { 'notaNumeroOrden': notaNumeroOrden, 'notaTexto': notaTexto.trim(), 'usuarioId': usuarioId.trim() });
  }

  updateNotaNumeroOrden(notaId, notaNumeroOrden, usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/updateNotaNumeroOrden';
    return this.http.post(url, { 'notaId': notaId, 'notaNumeroOrden': notaNumeroOrden, 'usuarioId': usuarioId.trim() });
  }

  updateNotaTexto(notaId, notaTexto, usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/updateNotaTexto';
    return this.http.post(url, { 'notaId': notaId, 'notaTexto': notaTexto.trim(), 'usuarioId': usuarioId.trim() });
  }

  deleteNota(notaId, usuarioId) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/deleteNota';
    url = url + '?notaId=' + notaId + '&usuarioId=' + usuarioId.trim();
    return this.http.get(url);
  }

  getUsuario(usuarioEmail, usuarioPassword) {
    var url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todoappv2-zxque/service/TODOService/incoming_webhook/getUsuario';
    url = url + '?usuarioEmail=' + usuarioEmail.trim() + '&usuarioPassword=' + usuarioPassword.trim();
    return this.http.get(url);
  }

}
