import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryStoreService {

  equations = [];

  constructor() { }

  public updateHistory(equation: string, result:string) {
    let equationObj = {equation, result};
    this.equations.push(equationObj);
  }

}
