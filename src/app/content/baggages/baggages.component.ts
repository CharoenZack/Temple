import { Component, OnInit } from '@angular/core';
import { Baggage } from '../../shared/interfaces/baggage';
import { BaggageService } from '../../shared/service/baggage.service';

@Component({
  selector: 'app-baggages',
  templateUrl: './baggages.component.html',
  styleUrls: ['./baggages.component.css']
})
export class BaggagesComponent implements OnInit {

  items: Baggage[];

  cols: any[];
  constructor(private baggage:BaggageService) { }

  ngOnInit() {
    
    this.items = this.baggage.getItem();
    console.log(this.items)
    this.cols = [
      {field: 'date',header: 'วันที่'},{field: 'id',header: 'หมายเลขตู้'},{field: 'status',header:'สถานะ'}
    ]
  }

}
