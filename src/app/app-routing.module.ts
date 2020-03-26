import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageOverviewComponent } from './message-overview/message-overview.component';


const routes: Routes = [
   {
        path: '',
        redirectTo :'message-overview',
      pathMatch :'full'    },
      {
        path :'message-overview',
        loadChildren :() =>import('./message-overview/message-overview.module').then(mod=>mod.MessageOverviewModule)
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 {
       
      }