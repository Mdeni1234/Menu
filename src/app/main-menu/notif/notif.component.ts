import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pesanan } from 'src/app/_model/pesanan.model';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NotifComponent implements OnInit {

  form : FormGroup;
  constructor(
    public dialog: MatDialogRef<NotifComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) { }
    set() {
      let control = <FormArray> this.form.controls.hasilPesanan;
      this.data.form.pesanan.forEach( m => {
        control.push(this.fb.group({
          pesanan: { value: m.namaPesanan+ ' x ' + m.jumlahPesanan+ ' =  Rp.' +m.hargaPesanan * m.jumlahPesanan, disabled: true}
        }))
        
      });
    }



  ngOnInit() {
    this.form = this.fb.group({
      hasilPesanan: this.fb.array([])
    })
    this.set()   
  }
  

}
