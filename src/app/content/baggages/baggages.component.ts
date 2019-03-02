import { Component, OnInit } from '@angular/core';
import { Baggage } from '../../shared/interfaces/baggage';
import { BaggageService } from '../../shared/service/baggage.service';


@Component({
  selector: 'app-baggages',
  templateUrl: './baggages.component.html',
  styleUrls: ['./baggages.component.css']
})
export class BaggagesComponent implements OnInit {

  displayDialog: boolean;
  items: Baggage[];
  newBaggage: boolean;
  baggage: Baggage;
  baggageNumber: String;
  cols: any[];
  constructor(private baggageService: BaggageService) { }

  ngOnInit() {

    //this.items = this.baggage.getItem();
    this.baggageService.getItem().toPromise().then(res => {
      if (res['status'] == 'Success')
        this.items = res['data']
    });

    this.cols = [
      // {field: 'date',header: 'วันที่'},{field: 'id',header: 'หมายเลขตู้'},{field: 'status',header:'สถานะ'}
      { field: 'date', header: 'วันที่' }, { field: 'number', header: 'หมายเลขตู้' }
    ]
  }


  showEdit(id) {
    console.log(id);
    this.newBaggage = false;
    this.baggage = this.items.filter(e => e.id == id)[0];
    console.log(this.baggage['number']);
    this.baggageNumber = this.baggage['number'];
    this.displayDialog = true;
  }

  delete(id) {
    const index = this.items.findIndex(e => e.id === id)
    console.log(index);
    this.baggageService.delete(id).toPromise()
    .then(res=>{
      if(res['status']=="Success"){
        this.items = [
          ...this.items.slice(0, index),
          ...this.items.slice(index + 1)
        ]
      }
    });

    

  }

  save() {
    const baggage = {
      name: this.baggageNumber
    }
    this.baggageService.save(baggage).toPromise().then(res => {
      console.log(res);
      if (res['status'] === 'Success') {
        this.items = [
          ...this.items,
          res['data']
        ]
      }
    })
    this.clear()

  }

  update() {
    const data = {
      id: this.baggage['id'],
      number: this.baggageNumber
    }
    this.baggageService.update(data)
      .subscribe(res => {
        if (res['status'] === 'Success') {
          const index = this.items.findIndex(e => e.id == res['data']['id']);
          this.items[index].number = res['data']['number']
        }
      })
    this.clear()
  }

  clear() {
    this.baggage = {date:'',number:'',id:''};
    this.baggageNumber = ''
    this.displayDialog = false;
  }


  showDialogToAdd(){
    this.newBaggage = true;
    this.baggage = {date:'',number:'',id:''};
    this.displayDialog = true;
  }
}
