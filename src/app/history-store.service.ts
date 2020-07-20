import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryStoreService {

  equations = [];

  public updateHistory(e: string) {
    this.equations.push(e);

    console.log(String(this.equations));
  }

  constructor() { }
}
