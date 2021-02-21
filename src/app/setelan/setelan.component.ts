import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuService } from '../_service/menu.service';
import { MatMenuTrigger, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Menu } from '../_model/menu.model';
import { MenuComponent } from './menu/menu.component';

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
    public dialog: MatDialog
  ) { }
  ngOnInit() {
    this.serviceMenu.getMenu().subscribe((item) => {
      this.menu = item.map( o => {
        return {
          id: o.payload.doc.id,
          ...(o.payload.doc.data()) as Menu
        } 
      });
    }); 
  }
  onDel(id, i) {
    this.serviceMenu.deleteMenu(id.id);
  }
  onTambah(): void{
    const dialogRef = this.dialog.open(MenuComponent, {
      maxWidth: '90%',
      maxHeight: '90%',
      data: Menu
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
}
