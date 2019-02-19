import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit() {
  }

  btnSidebar() {
    let data;
    this.sidebarService.sidebar().subscribe(res => data = res);
    this.sidebarService.switchBar(!data);
  }
}
