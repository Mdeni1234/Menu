import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_service/menu.service';
import { Pesanan } from '../_model/pesanan.model';
import { Observer, Observable } from 'rxjs';
import { Penjualan } from '../_model/penjualan.model';
import { combineLatest, map } from 'rxjs/operators';
import { PesananService } from '../_service/pesanan.service';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { AuthService } from '../_service/auth.service';
@Component({
  selector: 'app-list-pesanan',
  templateUrl: './list-pesanan.component.html',
  styleUrls: ['./list-pesanan.component.scss']
})
export class ListPesananComponent implements OnInit {

  pesanan;
  penjualan;
  gabungan;
  admin : boolean;
  status: boolean
  form = new FormGroup({
    "date": new FormControl("", Validators.required),
});

  constructor(
    private service: PesananService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(usr => {
      if(this.auth.isAdmin(usr)) {
        this.admin = true;
        this.getMenu()
      } else {
        this.getMenuUser();
        this.admin = false;
      }
      
    })
  }
  getMenuUser(){
    this.status = false
        this.service.getPesanan().subscribe( data => {
          this.pesanan = data.map(o => {
            return {
              id : o.payload.doc.id,
              ...(o.payload.doc.data() as Pesanan)
            } 
          });
          console.log(this.pesanan)
        })
  }
  getMenu() {
    this.service.getPenjualan().subscribe(res => {
      if(res.length > 0) {
        this.status = true
        this.pesanan = res.map(o => {
          return {
            id : o.payload.doc.id,
            ...(o.payload.doc.data() as Penjualan)
          }
        })
      } else {
        this.status = false
        this.service.getPesanan().subscribe( data => {
          this.pesanan = data.map(o => {
            return {
              id : o.payload.doc.id,
              ...(o.payload.doc.data() as Pesanan)
            } 
          });
          console.log(this.pesanan)
        })
      }
    })
  }
  resetPenjualan() {
    let status: boolean = true;
    return this.service.resetPenjualan(status)
  }
  onFilter(value) {
    this.status = true;
    if(this.status) {
      this.form.disabled
    }
    return this.service.setPenjualan(value.date.begin, value.date.end)
  }

}
