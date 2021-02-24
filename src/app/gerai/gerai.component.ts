import { Component, OnInit } from '@angular/core';
import { Menu } from '../_model/menu.model';
import { MatMenuTrigger, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material';
import { BuatGeraiComponent } from './buat-gerai/buat-gerai.component';
import { from } from 'rxjs';
import { MenuService } from '../_service/menu.service';
import { Gerai } from '../_model/gerai.model';
import { GeraiService } from '../_service/gerai.service';
import { User } from '../_model/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gerai',
  templateUrl: './gerai.component.html',
  styleUrls: ['./gerai.component.scss']
})
export class GeraiComponent implements OnInit {

  user : User[];
  gerai : Gerai[];
  displayedColumns: string[] = ['no', 'gerai', 'buka', 'tutup', 'user', 'menu', 'aksi'];
  constructor(
    private serviceGerai: GeraiService,
    private router : Router,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    // this.serviceMenu.getMenu().subscribe((item) => {
    //   this.menu = item.map( o => {
    //     return {
    //       id:o.payload.doc.id,
    //       ...(o.payload.doc.data() as Menu)
    //     } 
    //   });
    // }); 
    this.getusers();
    this.getGerai()
  }
  getGerai() {
    this.serviceGerai.ambilGerai().subscribe( data => {
    this.gerai = data.map( value => {
      return {
        id: value.payload.doc.id,
        ...(value.payload.doc.data() as Gerai)
      }
    })
    })
  }
  getusers() {
    this.serviceGerai.ambilUsers().subscribe((user) => {
      this.user = user.map((value) => {
        return {
          id: value.payload.doc.id,
          ...(value.payload.doc.data() as User)
        };
      });
    })
  }
  onDel(id, i) {
    this.serviceGerai.deleteGerai(id.id);
  }
  tambahGerai(): void{
    let users = this.user;
    const data = {
      user: users
    }
    const dialogRef = this.dialog.open(BuatGeraiComponent, {
      maxWidth: '90%',
      maxHeight: '90%',
      data: data
    })
    dialogRef.afterClosed().subscribe( res => {
      setTimeout( () => { 
        this.ngOnInit();
      }, 3);
    });
  }
 sendData(gerai: Gerai) {
   console.log(gerai);
   this.router.navigateByUrl('/setelmenu', {state: {id: gerai.id}});
  // const dialogRef = this.dialog.open(BuatGeraiComponent, {
  //   maxWidth: '90%',
  //   maxHeight: '90%',
  //   data: gerai
  // });
  // dialogRef.afterClosed().subscribe(res => this.ngOnInit()
  // );
 }  
}

