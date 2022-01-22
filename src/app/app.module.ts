import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetelanComponent } from './setelan/setelan.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as Material from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AlertComponent } from './alert/alert.component';
import { AlertModule } from './alert/alert.module';
import { ListPesananComponent } from './list-pesanan/list-pesanan.component';
import { MenuService } from './_service/menu.service';
import { StokComponent } from './setelan/stok/stok.component';
import { MenuComponent } from './setelan/menu/menu.component';
import { NotifComponent } from './main-menu/notif/notif.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {TimeAgoPipe} from 'time-ago-pipe';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { AuthService } from './_service/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavbarComponent } from './navbar/navbar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AlertService } from './_service/alert.service';
import { UserService } from './_service/user.service';
import { HasilPenjualanComponent } from './list-pesanan/hasil-penjualan/hasil-penjualan.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { APP_INITIALIZER } from '@angular/core';
import { GeraiComponent } from './gerai/gerai.component';
import { BuatGeraiComponent } from './gerai/buat-gerai/buat-gerai.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PageAksesComponent } from './page-akses/page-akses.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SatNativeDateModule, SatDatepickerModule } from 'saturn-datepicker'

const modules = [
  Material.MatCardModule,
  Material.MatInputModule,
  Material.MatButtonModule,
  Material.MatSnackBarModule,
  Material.MatListModule,
  Material.MatToolbarModule,
  Material.MatMenuModule,
  Material.MatIconModule,
  Material.MatBadgeModule,
  Material.MatTableModule,
  Material.MatDialogModule,
  Material.MatFormFieldModule,
  Material.MatTabsModule,
  Material.MatSelectModule,
  Material.MatNativeDateModule,
  Material.MatDatepickerModule,
  Material.MatFormFieldModule,
  Material.MatDatepickerModule,
  Material.MatNativeDateModule,
  Material.MatFormFieldModule,
  Material.MatInputModule,
  SatNativeDateModule,
  SatDatepickerModule
];
@NgModule({
  declarations: [
    AppComponent,
    SetelanComponent,
    MainMenuComponent,
    ListPesananComponent,
    StokComponent,
    MenuComponent,
    NotifComponent,
    TimeAgoPipe,
    SignInComponent,
    NavbarComponent,
    HasilPenjualanComponent,
    GeraiComponent,
    BuatGeraiComponent,
    PageAksesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    HttpClientModule,
    FormsModule,
    ...modules,
    AlertModule,
    ScrollingModule,
    NgxMaterialTimepickerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

  ],
  providers: [
    MenuService,
    AngularFirestore,
    AuthService,
    AngularFireAuth,
    AlertService,
    // JadwalService,
    // fakeBackendProvider,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent,
    MenuComponent,
    NotifComponent,
    HasilPenjualanComponent,
    BuatGeraiComponent,
    ]
})
export class AppModule { }
