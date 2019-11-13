import { Component, OnInit } from '@angular/core';
import { Location } from '../../shared/interfaces/location';
import { LocationService } from './location.service';
import { MessageService, MenuItem, Message } from 'primeng/api';
import { BreadcrumbService } from 'src/app/shared/service/breadcrumb.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  displayDialog: boolean;
  newLocation: boolean;
  location: Location;
  public formEdit: FormGroup;
  locations: Location[];
  cols: any[];
  public menu: MenuItem[];
  public msgs: Message[] = [];
  locationNameEdit: String;

  constructor(
    private locationService: LocationService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private breadCrumbService: BreadcrumbService
  ) {
  }

  ngOnInit() {
    this.breadCrumbService.setPath([
      { label: 'จัดการสถานที่ทั้งหมด', routerLink: '/location' },
    ]);

    this.getLocation();
    this.cols = [
      { field: 'name', header: 'สถานที่' },
    ];

    this.menu = [
      { label: '', icon: 'pi pi-home', routerLink: '/' },
      { label: 'จัดการสถานที่' },
    ];
    this.createForm();
  }

  showDialogToAdd() {
    this.newLocation = true;
    this.location = {};
    this.displayDialog = true;
  }

  createForm() {
    this.formEdit = this.formBuilder.group(
      {
        locationName: ['', Validators.required],
      }
    );
  }
  save() {
    this.msgs = [];
    // this.messageService.clear();
    this.location['name'] = this.locationNameEdit;
    this.locationService.save(this.location).toPromise().then(res => {
      if (res['status'] === 'Success') {
        // this.messageService.add({ severity: 'success', summary: 'เพิ่มสำเร็จ', detail: 'สถานที่ : ' + res['data']['name'] });
        this.msgs = [{ severity: 'success', summary: 'เพิ่มสำเร็จ', detail: 'สถานที่ : ' + res['data']['name'] }];
        this.locations = [
          ...this.locations,
          res['data']
        ];
      } else {
        this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'เพิ่มสถานที่ไม่สำเร็จ' }];
      }
    });
    this.clear();

  }

  clear() {
    this.location = {};
    this.locationNameEdit = '';
    this.displayDialog = false;
    this.formEdit.reset();
  }

  showEdit(id) {
    this.newLocation = false;
    this.location = this.locations.filter(e => e.id === id)[0];
    this.locationNameEdit = this.location['name'];
    this.displayDialog = true;
  }

  delete(id) {
    this.msgs = [];
    // this.messageService.clear();
    const index = this.locations.findIndex(e => e.id === id);
    this.locationService.delete(id).toPromise()
      .then(res => {
        if (res['status'] === 'Success') {

          //
          this.locations = [
            ...this.locations.slice(0, index),
            ...this.locations.slice(index + 1)
          ];
          this.messageService.add({ severity: 'success', summary: 'ลบสำเร็จ' });
          this.msgs = [{ severity: 'success', summary: 'ลบสำเร็จ', detail: 'สถานที่ : ' + res['data']['name'] }];
        } else {
          this.msgs = [{ severity: 'error', summary: 'ข้อความจากระบบ', detail: 'ลบสถานที่ไม่สำเร็จ' }];
        }
      });
  }

  getLocation() {
    this.locationService.getLocation()
      .toPromise().then(res => {
        if (res['status'] === 'Success') {
          this.locations = res['data'];
        }
      });
  }

  update() {
    this.messageService.clear();
    this.location['name'] = this.locationNameEdit;
    this.locationService.update(this.location).toPromise().then(res => {
      if (res['status'] === 'Success') {
        const index = this.locations.findIndex(e => e.id === res['data']['id']);
        this.locations[index].name = res['data']['name'];
      }
      this.messageService.add({ severity: 'success', summary: 'แก้ไขสำเร็จ', detail: 'สถานที่ : ' + res['data']['name'] });
    });
    this.clear();
  }

}
