import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hasil-penjualan',
  templateUrl: './hasil-penjualan.component.html',
  styleUrls: ['./hasil-penjualan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HasilPenjualanComponent implements OnInit {
  form : FormGroup;
  constructor(
    public dialog: MatDialogRef<HasilPenjualanComponent>, 
    @Inject(MAT_DIALOG_DATA) public data : any,
    private fb: FormBuilder) {

     }
     set() {
      let control = <FormArray> this.form.controls.hasilPesanan;
      this.data.penjualan.forEach( m => {
        control.push(this.fb.group({
          pesanan: { value: m.namaPesanan + '(' +m.terjual+')', disabled: true}
        }))
        console.log(m)
      });
    }

  ngOnInit() {
    this.form = this.fb.group({
      hasilPesanan: this.fb.array([])
    })
    this.set()   
    }

}
