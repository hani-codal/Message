import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageOverviewComponent } from './message-overview.component';
import { AddNewTemplateComponent } from './add-new-template/add-new-template.component';
import { ViewTemplateComponent } from './view-template/view-template.component';
import { AddNewMessageComponent } from './add-new-message/add-new-message.component';



const routes: Routes = [
  {
    path :'',
    component : MessageOverviewComponent
  },
  {
    path:'add-New-Message',
    component : AddNewMessageComponent
  },
  {
    path:'view-Template',
    component : ViewTemplateComponent
  },
  {
    path : 'add-New-Message/view-Template',
    component : ViewTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageOverviewRoutingModule { }
