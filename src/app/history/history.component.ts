import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { HistoryStoreService } from '../history-store.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  equations = [];

  @Output() messageEvent = new EventEmitter<string>();

  constructor(private HistoryService: HistoryStoreService) { }

  ngOnInit() {
    this.equations = this.HistoryService.equations;
  }

  public doSomething(m:string) {
    console.log(m);
    this.messageEvent.emit(m);
  }

}
