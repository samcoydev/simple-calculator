import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryStoreService {

  equations = [];

  public updateHistory(equation: string, result:string) {
    let equationObj = {equation, result};
    this.equations.push(equationObj);
  }

  constructor() { }
}
