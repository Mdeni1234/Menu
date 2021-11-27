import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_service/menu.service';
import { Pesanan } from '../_model/pesanan.model';
import { Observer, Observable } from 'rxjs';
import { Penjualan } from '../_model/penjualan.model';
import { combineLatest, map } from 'rxjs/operators';
import { PesananService } from '../_service/pesanan.service';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
@Component({
  selector: 'app-list-pesanan',
  templateUrl: './list-pesanan.component.html',
  styleUrls: ['./list-pesanan.component.scss']
})
export class ListPesananComponent implements OnInit {

  pesanan;
  penjualan;
  gabungan;
  status: boolean
  form = new FormGroup({
    "date": new FormControl("", Validators.required),
});

  constructor(
    private service: PesananService
  ) { }

  ngOnInit() {
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
  onFilter(value) {
    this.service.setPenjualan(value.date.begin, value.date.end)
  }

}
