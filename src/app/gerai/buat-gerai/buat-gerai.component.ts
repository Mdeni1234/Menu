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
  form: FormGroup;
  user : any[] = [];
  a : any[] = [];
  disableSelect = new FormControl(false);
  constructor(
    private formBuilder: FormBuilder,
    private service: GeraiService,
    private UserService: UserService,
    public dialogRef: MatDialogRef<BuatGeraiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    const dataUser = new Observable((observer) => {
      this.UserService.getUser().subscribe( usr => {
        const user : User[] = usr.map(item => {
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data() as User
          };
        });
        observer.next(user);
      });
    });
    dataUser.subscribe((user: User[])=> {
      user.forEach(item => {
        if(!item.gerai) {
          this.user = [item.email]
        }
        console.log(this.user)
      });
    })
  }
  ngOnInit() {
    // this.getUser();
    this.buatGerai();
    
    // for(let i = 0; i < this.data.user.length; i++) {
    //   return this.users.push(
    //     this.data.user[i]
    //   )
    // }
    // this.user = Array.of(this.data.user);
    // this.a = [this.user[0]];
    // console.log(this.data.user)
  }
    getUser() {
    this.UserService.getUser().subscribe( usr =>{
      const user = usr.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as User
        };
      });
      console.log(user);
    });
  }
  buatGerai() {
    if(this.data == null) {
      this.data.id = null;
      this.data.namaGerai = null;
      this.data.jamBuka = null;
      this.data.jamTutup = null;
    }
    this.form = this.formBuilder.group({
      id: [this.data.id],
      namaGerai: [this.data.namaGerai, ],
      jamBuka: [this.data.jamBuka],
      jamTutup: [this.data.jamTutup],
      users: [this.data.user]
    });
  }
  tambahGerai(value)  {
    console.log(value)
    if (value.id == null) {
      this.service.tambahGerai(value);
      this.dialogRef.close();
    } else {
      // this.service.updateMenu(value);
      // this.dialogRef.close();
    }  
  }
  getusers() {
    this.service.ambilUsers().subscribe( user => {
      // this.user = 
    })
  }

}
