
export class Nota {

  notaId: number;
  notaOrden: number;
  notaTexto: string;

  constructor(_notaId: number, _notaOrden: number, _notaTexto: string) {
    this.notaId = _notaId;
    this.notaOrden = _notaOrden;
    this.notaTexto = _notaTexto;
  }

}
