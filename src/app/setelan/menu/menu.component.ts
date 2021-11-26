import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MenuService } from 'src/app/_service/menu.service';
import { Menu } from 'src/app/_model/menu.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { del } from 'selenium-webdriver/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {  
  menu: Menu[];
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: MenuService,
    public dialogRef: MatDialogRef<MenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.buatMenu();
  }
  buatMenu() {
    // console.log(this.data == null)
    // if(this.data == null) {
    //   this.data.id = null;
    //   this.data.hargaMenu = null;
    //   this.data.namaMenu = null;
    //   this.data.stok = null;
    // }
    console.log(this.data)
    this.form = this.formBuilder.group({
      idGerai: [this.data.idGerai],
      id: [this.data.id],
      namaMenu: [this.data.namaMenu],
      hargaMenu: [this.data.hargaMenu, [ Validators.pattern('[0-9]+[0-9]')]],
      stok: [this.data.stok, [ Validators.pattern('[0-9]+[0-9]?')]]
    });
  }
  tambahMenu(value)  {
    console.log(value)
    if (value.id == null) {
      this.service.addMenu(value);
      this.dialogRef.close();
    } else {
      this.service.updateMenu(value);
      this.dialogRef.close();
    }  
  }
}
