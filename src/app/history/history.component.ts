import { Component, OnInit } from '@angular/core';
import { HistoryStoreService } from '../history-store.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  equations = [];

  constructor(private HistoryService: HistoryStoreService) { }

  ngOnInit() {
    this.equations = this.HistoryService.equations;
  }

}
