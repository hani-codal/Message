import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { pmsAPI } from './services/swagger-providers/pms-api.provider';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [
   pmsAPI
  ],
  bootstrap: [AppComponent],
  schemas :[]
})
export class AppModule { }
