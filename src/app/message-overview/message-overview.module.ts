import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MessageOverviewRoutingModule } from './message-overview-routing.module';
import { MessageOverviewComponent } from './message-overview.component';
import { AddNewTemplateComponent } from './add-new-template/add-new-template.component';
import { AddNewMessageComponent } from './add-new-message/add-new-message.component';
import { ViewTemplateComponent } from './view-template/view-template.component';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {UserService}from '../services/user-list.service';
//import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [MessageOverviewComponent, AddNewTemplateComponent, AddNewMessageComponent, ViewTemplateComponent],
  imports: [
    CommonModule,
    MessageOverviewRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatMenuModule
    
  ],
  exports:[
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDialogModule,
   
    
  ],
  providers:[
    UserService
  ]
})
export class MessageOverviewModule { }
