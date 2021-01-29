import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'ng2-toastr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDatepickerModule,  DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import {  RouterModule } from '@angular/router';
import { ROUTES } from './app.route';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UsuarioService } from './_services/usuario.service';
import { AppComponent } from './app.component';
import { CadastrousuarioComponent} from './cadastrousuario/cadastrousuario.component';
import { NavComponent } from './nav/nav.component';
import { RelatoriousuarioComponent } from './relatoriousuario/relatoriousuario.component';
import { UsuarioeditComponent } from './relatoriousuario/usuarioedit/usuarioedit.component';
import { DateTimeFormatPipe } from './_helps/DateTimeFormat.pipe';




@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CadastrousuarioComponent,
    RelatoriousuarioComponent,
    UsuarioeditComponent,
    DateTimeFormatPipe
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    ToastModule.forRoot(),
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    ModalModule.forRoot(),
  ],
  providers: [
      UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
