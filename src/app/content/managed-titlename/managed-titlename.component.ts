import { Component, OnInit } from '@angular/core';
import { TitleName } from '../../shared/interfaces/title-name';
import { TitleNameService } from 'src/app/shared/service/title-name.service';

@Component({
  selector: 'app-managed-titlename',
  templateUrl: './managed-titlename.component.html',
  styleUrls: ['./managed-titlename.component.css']
})
export class ManagedTitlenameComponent implements OnInit {

  displayDialog: boolean;
  newtitleName: boolean;
  titleName: TitleName;
  titleNames: TitleName[];
  titleNameEdit:String
  titleNameAbbrEdit:String
  cols: any[];
  constructor(
    private titleNamesService : TitleNameService
  ) { }

  ngOnInit() {

   this.getTitleName()
    this.cols = [
      { field: 'titleNameDisplay', header: 'คำนำหน้า' }, { field: 'titleNameAbbr', header: 'คำย่อ' }
    ]
  }

  getTitleName(){
    this.titleNamesService.getTitleNamesV2()
    .subscribe(res=>{
      if(res['status']=="Success"){
        this.titleNames = res['data'];
      }
    })
  }

  showDialogToAdd() {
    this.newtitleName = true;
    this.titleName = {};
    this.displayDialog = true;
  }

  save() {
    this.displayDialog = false;
  }
  clear() {
    this.titleName = {};
    this.displayDialog = false;
  }

  update(){
    console.log('ok');
    const data = {
      titleNameCode:this.titleName.titleNameCode,
      titleNameDisplay:this.titleNameEdit,
      titleNameAbbr:this.titleNameAbbrEdit
    }
    this.titleNamesService.updateTitleName(data)
    .subscribe(res=>{
      console.log(res);
      
      if(res['status']=="Success"){
        const index = this.titleNames.findIndex(e => e.titleNameCode == res['data']['titleNameCode']);
        this.titleNames[index] = res['data'];
      }
    })
    this.clear();
  }

  showEdit(id){
    this.newtitleName = false;
    this.titleName = this.titleNames.filter(e => e.titleNameCode == id)[0];
    this.titleNameEdit = this.titleName['titleNameDisplay'];
    this.titleNameAbbrEdit ;
    this.displayDialog = true;
  }

  delete(id){
    console.log('delete');
    
  }
}
