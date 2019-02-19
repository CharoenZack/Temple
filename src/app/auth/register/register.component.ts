import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public title: String;
  constructor(
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.title = "Register";
  }

  setTypeForm() {
    const { formtype } = this.route.snapshot.data
    console.log(formtype,"resgister");
  }

}
