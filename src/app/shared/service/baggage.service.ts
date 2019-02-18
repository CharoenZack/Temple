import { Injectable } from '@angular/core';
import { Baggage } from "../interfaces/baggage";
@Injectable({
  providedIn: 'root'
})
export class BaggageService {

  constructor() { }

  getItem() : Baggage[] {
    let bag = [{ date:"10/2/2019",id:"A01",status:"ฝาก"}]
    return bag;
      
    
  }
}
