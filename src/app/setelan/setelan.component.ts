import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../_service/menu.service';
import { MatMenuTrigger, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Menu } from '../_model/menu.model';
import { MenuComponent } from './menu/menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { AlertService } from '../_service/alert.service';
import { BuatGeraiComponent } from '../gerai/buat-gerai/buat-gerai.component';

@Component({
  selector: 'app-setelan',
  templateUrl: './setelan.component.html',
  styleUrls: ['./setelan.component.scss']
})
export class SetelanComponent implements OnInit {
  menu: Menu[];
  displayedColumns: string[] = ['no', 'nama', 'harga', 'stok', 'aksi'];
  constructor(
    private serviceMenu: MenuService,
    private router: Router,
    private activeRoute : ActivatedRoute,
    private location: Location,
    private alert: AlertService,
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    if(window.history.state.id) {
    this.serviceMenu.getMenuAdmin(window.history.state.gerai.id).subscribe((item) => {
      this.menu = item.map( o => {
        console.log(o.payload.doc.id)
        return {
          idGerai: window.history.state.gerai.id,
          id: o.payload.doc.id,
          ...(o.payload.doc.data()) as Menu
        } 
      });
    }); 
  } else {
    console.log('sdas')
    this.alert.sukses('Gerai tidak ditemukan', '1');
    setTimeout(() => {
      this.location.back();
    }, 2000);
  }
  }
  onDel(idGerai, id,) {
    this.serviceMenu.deleteMenu(idGerai, id);
  }
  onTambah(): void{
    const dialogRef = this.dialog.open(MenuComponent, {
      maxWidth: '90%',
      maxHeight: '90%',
      data: {idGerai: window.history.state.gerai.id, menu: this.menu}
    })
    dialogRef.afterClosed().subscribe( res => {
      setTimeout( () => { 
        this.ngOnInit();
      }, 3);
    });
  }
 onEdit(menu: Menu) {
  const dialogRef = this.dialog.open(MenuComponent, {
    maxWidth: '90%',
    maxHeight: '90%',
    data: menu
  });
  dialogRef.afterClosed().subscribe(res => this.ngOnInit()
  );
 }
 onEditGerai() {
  const dialogRef = this.dialog.open(BuatGeraiComponent, {
    maxWidth: '90%',
    maxHeight: '90%',
    data: window.history.state
  });
  dialogRef.afterClosed().subscribe(res => this.ngOnInit()
  );
 }    
}
