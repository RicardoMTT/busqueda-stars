import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { StarsComponent } from './components/stars/stars.component';
import { HomeComponent } from './components/home/home.component';
import { ResultadoComponent } from './components/resultado/resultado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    StarsComponent,
    HomeComponent,
    ResultadoComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,APP_ROUTING,CommonModule,ReactiveFormsModule, BrowserAnimationsModule,MatDialogModule,MatCardModule
  ],
  entryComponents:[ConfirmDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
