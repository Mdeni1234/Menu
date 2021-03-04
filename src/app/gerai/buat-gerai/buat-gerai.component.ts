import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { MenuService } from 'src/app/_service/menu.service';
import { Menu } from 'src/app/_model/menu.model';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { GeraiService } from 'src/app/_service/gerai.service';
import { User } from 'src/app/_model/user';
import { UserService } from 'src/app/_service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buat-gerai',
  templateUrl: './buat-gerai.component.html',
  styleUrls: ['./buat-gerai.component.scss']
})
export class BuatGeraiComponent implements OnInit {

  menu: Menu[];
  gerai: FormGroup;
  users = [];
  a : any[] = [];
  disableSelect = new FormControl(false);
  constructor(
    private formBuilder: FormBuilder,
    private service: GeraiService,
    private UserService: UserService,
    public dialogRef: MatDialogRef<BuatGeraiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.buatGerai();
    this.getUser();
    
  }
    getUser() {
    this.UserService.getUser().subscribe( usr => {
      usr.map(item => {
        if(!item.payload.doc.data()['gerai'] && item.payload.doc.data()['roles']['admin'] == false ) {
          console.log('oke')
          this.users.push({
            ...item.payload.doc.data() as User
          });
        } 
      });
      if(this.data.gerai.user != null || this.data.gerai.user != undefined){
        this.users.push(this.data.gerai.user)
      }
    });
  }
  buatGerai() {
   
    if(this.data.gerai == null || this.data.gerai == undefined) {
      this.data.gerai.id = null;
      this.data.gerai.namaGerai = null;
      this.data.gerai.jamBuka = null;
      this.data.gerai.jamTutup = null;
      this.data.gerai.user = null;
    }
    this.gerai = this.formBuilder.group({
      id: [this.data.gerai.id],
      namaGerai: [this.data.gerai.namaGerai],
      jamBuka: [this.data.gerai.jamBuka],
      jamTutup: [this.data.gerai.jamTutup],
      user: [this.data.gerai.user]
    });
  }
  tambahGerai(value)  {
    let oldUser = this.data.user.uid;
    let newUser = value.user;
   const userData = this.users.find(({uid}) => uid === newUser )
    if (value.id == null) {
      this.service.tambahGerai(value, userData);
      this.dialogRef.close();
    } else {
      this.service.updateGerai(value, oldUser, userData);
      this.dialogRef.close();
    }  
  }

}
