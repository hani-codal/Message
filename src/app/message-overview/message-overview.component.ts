import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user-list.service';
import {userListModel} from '../message-overview/userList.model';

@Component({
  selector: 'app-message-overview',
  templateUrl: './message-overview.component.html',
  styleUrls: ['./message-overview.component.css']
})
export class MessageOverviewComponent implements OnInit {

  item :string[]=[
    "hani",
    "joshi",
    "kumar"
  ]
  constructor(private userService :UserService) { }

  ngOnInit(): void {
    //this.getCompanyUser(true);
  }
  // public gridOptions: any = {
  //   reorderable: true,
  //   limit: 10,
  //   footerHeight: 24,
  //   offset: 0,
  //   ordering: 'company_user__first_name'
  // }
  // users : any = {data :[]};
  // owner: string = 'true';
  //   getCompanyUser(owner ) {
  //     // this.loaderService.show();
  //      this.owner = owner;
  //     const params: userListModel = { companyId: '1', inOwnerCompany: this.owner, project :2}
  //     this.userService.companyUserList(params).subscribe((res: any) => {
  //       if (res.body) {
  //         this.users = {
            
  //           data: res.body.results || []
  //         }
  //         console.log("resss",this.users.data)
  //       } else {
  //         this.users = {
            
  //           data: []
  //         }
  //       }
        
  //     }, (error) => { 
  //       console.log("error",error);
  //     })
  //   }
  }


