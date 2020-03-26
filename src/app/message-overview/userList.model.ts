export interface userListModel {
       companyId: string,
    inOwnerCompany: string,
    
    project : number;
}

export interface deleteUsertModel {
    id: number,
    userType: string
}
export interface inviteUsertModel {
    first_name: string,
    last_name: string,
    email: string,
    company: string,
    project: any
}
export interface addUserModel {
    first_name: string,
    last_name: string,
    user_type: string,
    company_name: string,
    email: string,
    address: string,
    city: string,
    state: string,
    zip_code: string,
    phone_number: string,
    password: string,

}