import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_service/menu.service';
import { Menu } from '../_model/menu.model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AlertService } from '../_service/alert.service';
import { MustMatch } from '../_helper/must-match.validator';
import { MatDialog } from '@angular/material';
import { NotifComponent } from './notif/notif.component';
import { Observable } from 'rxjs';
import { PesananService } from '../_service/pesanan.service';
import { AuthService } from '../_service/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
menu: Menu[];
form: FormGroup;
Pesanan: number;
timer: any;
idGerai: string;



  constructor(
    private serviceMenu: MenuService,
    private servicePesanan: PesananService,
    private auth: AuthService,
    private builder: FormBuilder,
    private alert: AlertService,
    public dialog: MatDialog
  ) {   }

  ngOnInit() {
    this.create();
    this.auth.gerai$.subscribe( res => {
      res.forEach(item => {
        console.log(item.id)
        if(item.id !== undefined) {
          return this.getMenu(item.id)
        }
        
      });
      
    })
    } 
  
    getMenu(idGerai) {
      console.log(idGerai)
      this.idGerai = idGerai;
        this.serviceMenu.getMenu(idGerai).subscribe((item) => {
          const menu = item.map(o => {
            return {
              id : o.payload.doc.id,
              ...(o.payload.doc.data() as Menu)
            } 
          });
          this.menu = menu;
          let control = <FormArray> this.form.controls.pesanan;
          menu.forEach(x => {
            control.push(this.builder.group({
              id: [x.id], 
              namaPesanan: [x.namaMenu],
              hargaPesanan: [x.hargaMenu,] ,
              jumlahPesanan: [this.Pesanan, Validators.pattern('[0-9]+[0-9]?')],
              stok: [x.stok]
            }, {
              validators: MustMatch('jumlahPesanan', 'stok')
            })
            )
        })
      });
    }
    getForm(){
      this.timer = setInterval(()=> {
        if(typeof this.menu == 'undefined') {
          this.ngOnInit()
        } else if (typeof this.menu !== 'undefined') {
          clearInterval(this.timer);
          } else {
            console.log('Menu Belum Ditemukan');
          }
      }, 3000);
    }
  
    
    get f() { return this.form.controls.pesanan; }
   
    create(){
      this.form  = this.builder.group({
        pesanan: this.builder.array([])
      })
    }

  //   setPesanan(item : any) {
  //     this.menu = item;
  //     let control = <FormArray> this.form.controls.pesanan;
  //     item.forEach(x => {
  //       control.push(this.builder.group({
  //         id: [x.id], 
  //         namaPesanan: [x.namaMenu],
  //         hargaPesanan: [x.hargaMenu,] ,
  //         jumlahPesanan: [this.Pesanan, Validators.pattern('[0-9]+[0-9]?')],
  //         stok: [x.stok]
  //       }, {
  //         validators: MustMatch('jumlahPesanan', 'stok')
  //       })
  //       )
  //    })
  //    console.log(control);
  // }

  tambah(index: any, pesanan: number) {
    if(pesanan < (this.menu[index].stok - 0)){
    let z : number = (pesanan - 0) + 1;
    let control = (<FormArray> this.form.controls.pesanan).at(index);
    control['controls'].jumlahPesanan.setValue(z)
    } else {
      this.alert.sukses('Oops, Pesanan Anda melebihi stok yang ada :)');
    }
  }

  
    onSubmit(f) {
      console.log(f)
      let a = this.form.controls.pesanan as FormArray;
      let z = a.length;
      for(let c:number = 0; c < z; c++) {
        let control = (<FormArray> this.form.controls.pesanan).at(c);
        let s = control['controls'].jumlahPesanan.value
        if (s === 0 || s === null || s == 0) {
          a.removeAt(c);
          c--
          z--
        }
      }
      console.log(a)
    this.jumlah(z);
    
      
    }
    jumlah(z) { 
      let hasil: number = 0
      for (let a = 0; a < z; a++) {
        const control = (<FormArray> this.form.controls.pesanan).at(a);
        const s = control['controls'].jumlahPesanan.value;
        const d = control['controls'].hargaPesanan.value;
        let f = s * d;
        hasil = (hasil - 0) + f;
        console.log(hasil) 
        }
        
        if (hasil > 0){
          for (let a = 0; a < z; a++) {
            const control = (<FormArray> this.form.controls.pesanan).at(a);
            const i = control['controls'].id.value
            const d : number = control['controls'].jumlahPesanan.value;
            const s : number =  control['controls'].stok.value;
            let n = (s - 0 ) - d;
            this.serviceMenu.updateStokMenu(i, n, this.idGerai);
            }
        this.servicePesanan.addPesanan(z, hasil, this.form.value);
        const dialogRef = this.dialog.open(NotifComponent, {
          width: '80%',
          data: {length: z, hasil: hasil, form: this.form.value}
        })


          setTimeout(() => {this.ngOnInit()}, 30)
        } else {
          this.form.disabled
        }
      }
  
}
