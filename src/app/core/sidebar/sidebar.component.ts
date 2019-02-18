import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public openSideBar: boolean;
  public modalSidebar: boolean;
  public showCloseIconSidebar: boolean;
  public isLoggedIn: boolean;

  public screenWidth: number;
  constructor(
    private sidebarService: SidebarService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.setSidebar();
    this.sidebarService.sidebar().subscribe(res => this.openSideBar = res);
  }

  clickOutsidebar() {
    let data = this.openSideBar;
    this.sidebarService.switchBar(!data);
  }

  clickMenu() {
    if (this.screenWidth > 1024) {
      this.sidebarService.switchBar(true);
    } else {
      this.sidebarService.switchBar(false);
    }
  }

  @HostListener('window:resize', ['$event'])
  setSidebar(event?) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1024) {
      this.openSideBar = true;
      this.modalSidebar = false;
      this.showCloseIconSidebar = false;
      this.sidebarService.openSideBar();
    } else {
      this.openSideBar = false;
      this.modalSidebar = true;
      this.showCloseIconSidebar = false;
      this.sidebarService.closeSideBar();
    }
  }

  ngOnDestroy() {
    this.sidebarService.destroy();
  }

  logout(e) {
    e.preventDefault();
  }
}
