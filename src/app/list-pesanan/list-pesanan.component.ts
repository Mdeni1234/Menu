import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_service/menu.service';
import { Pesanan } from '../_model/pesanan.model';
import { Observer, Observable } from 'rxjs';
import { Penjualan } from '../_model/penjualan.model';
import { combineLatest, map } from 'rxjs/operators';
import { PesananService } from '../_service/pesanan.service';

@Component({
  selector: 'app-list-pesanan',
  templateUrl: './list-pesanan.component.html',
  styleUrls: ['./list-pesanan.component.scss']
})
export class ListPesananComponent implements OnInit {

  pesanan;
  penjualan;
  gabungan;

  constructor(
    private service: PesananService
  ) { }

  ngOnInit() {
    this.service.pesanan().subscribe( data => {
      this.pesanan = data;
      console.log(this.pesanan)
    })
  }
}
