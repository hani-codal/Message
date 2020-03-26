import { Injectable } from '@angular/core';
import { pmsAPI } from '../services/swagger-providers/pms-api.provider';
import { HeadersProvider } from '../services/header.provider';
//import { StorageService } from '../services/storage.service';
import { userListModel } from '../message-overview/userList.model';

@Injectable()
export class UserService extends HeadersProvider {

  constructor(private apiService: pmsAPI) { super(); }

  // // ADD USER
  // adduser(params: addUserModel) {
  //   const parameter = { data: params }
  //   return this.apiService.users_create(parameter, this.headers);
  // }

  // // GET USER LIST
  // getUser(params: userListModel) {
  //   return this.apiService.users_list(params, this.headers);
  // }

  // // REMOVE USER
  // deleteUser(params: deleteUsertModel) {
  //   return this.apiService.companyuser_delete(params, this.headers);
  // }

  // GET COMPANY USER LIST
  companyUserList(params) {
    return this.apiService.companyuser_list(params, this.headers);
  }

  // // GET COMPANY USER LIST
  // usertRoleList(params) {
  //   return this.apiService.userrole_list(params, this.headers);
  // }

  // // UPDATE USER ROLE
  // updateRole(params) {
  //   return this.apiService.users_partial_update(params, this.headers);
  // }

  // // INVITE USER
  // inViteUser(params) {
  //   return this.apiService.invitation_send_invitation({ data: params }, this.headers);
  // }

  // // Company List
  // getCompanyList(params) {

  //   return this.apiService.company_list(params, this.headers);
  // }
  // // Permission List
  // getPermissionList(params) {
  //   return this.apiService.userrole_list(params, this.headers);
  // }


  // //GET ADMIN and SUPER ADMIN
  // getAdminList(params) {
  //   return []
  //   // return this.apiService.companysuperadmin_list(params, this.headers);
  // }

  // // Assign Admin role
  // assignRole(params) {
  //   return this.apiService.companyuser_partial_update(params, this.headers);
  // }


  // //Remove Role
  // removePriviledges(params) {
  //   return this.apiService.companyuser_partial_update(params, this.headers);
  // }

  // //Search user
  // searchUser(params) {
  //   return this.apiService.companyuser_list(params, this.headers);
  // }


}

