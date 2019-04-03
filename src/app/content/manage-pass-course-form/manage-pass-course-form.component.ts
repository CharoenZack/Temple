import {Component, OnInit, ViewChild, SimpleChanges, Input, Output} from '@angular/core';
import {BreadcrumbService} from 'src/app/shared/service/breadcrumb.service';
import {isNgTemplate} from '@angular/compiler';

@Component({
  selector: 'app-manage-pass-course-form',
  templateUrl: './manage-pass-course-form.component.html',
  styleUrls: ['./manage-pass-course-form.component.css']
})
export class ManagePassCourseFormComponent implements OnInit {

  @Input() option:String;
  @Output() listData;
  @Input() member = [
    {
      name: 'test 1',
      checked: false
    },
    {
      name: 'test 2',
      checked: false
    },
    {
      name: 'test 3',
      checked: false
    },
    {
      name: 'test 4',
      checked: false
    },
    {
      name: 'test 5',
      checked: false
    },
    {
      name: 'test 6',
      checked: false
    },
  ];




  constructor(
    private breadCrumbService: BreadcrumbService
  ) {
  }

  ngOnInit() {
    this.option="2";
    this.breadCrumbService.setPath([
      {label: 'Manage Pass Course: จัดการการอนุมัติผู้เรียน'},
      {label: 'Manage Pass Course: จัดการการอนุมัติผู้เรียน'},
    ]);

  }

  getData(e){
    console.log(e);  
  }



}
