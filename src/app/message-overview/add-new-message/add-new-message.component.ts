import { Component, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AddTemplate } from '../message-overview.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { ElementRef, ViewChild } from '@angular/core';
import {UserService} from '../../services/user-list.service';
import {userListModel} from '../../message-overview/userList.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface NotifyEmployees {
  name: string;
}

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-add-new-message',
  templateUrl: './add-new-message.component.html',
  styleUrls: ['./add-new-message.component.css']
})
export class AddNewMessageComponent implements OnInit {


  messageDetails: AddTemplate[] = (JSON.parse(localStorage.getItem('TemplateList'))) || [];
  //messageDetail : AddTemplate;
  fileToggle = false;
  notifyEmpCtrl = new FormControl();
  filteredEmps: Observable<string[]>;
  templateList = this.fb.group({
    title: [''],
    body: ['']
  });
  users : any = {data :[]};
  owner: string = 'true';
  allEmps: string[] =  ["Hani Joshi", "Ayushi Maru", "Ekta Gandhi", "Heer Patel", "Het Ranch"] || this.users.data ;

  postMessage: Boolean = true;
  @ViewChild('notifyEmpInput') notifyEmpInput: ElementRef<HTMLInputElement>;
  constructor(private fb: FormBuilder, private messageService: MessageService ,private userService :UserService,public dialog: MatDialog) {
    this.filteredEmps = this.notifyEmpCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allEmps.slice()));
  }

  ngOnInit(): void {
    console.log((JSON.parse(localStorage.getItem('TemplateList'))));
    this.getCompanyUser(true);
  }
  // postMessage(){
  //  // this
  //  //alert("hani")
  //  //console.log(this.templateList.value)
  //  // this.messageDetail.name = this.name.toString();
  //   //console.log(this.messageDetail.name)

  // }
  checkValue() {
    console.log("i am in checkvalue")
    if (this.templateList.value.title && this.templateList.value.body) {
      this.postMessage = false;
    }
    else {
      this.postMessage = true;
    }

  }
  // onSubmit(){
  //   console.log(this.templateList.value)
  //   this.messageDetails.push(this.templateList.value);
  //   console.log(this.messageDetails) 
  //   localStorage.setItem('TemplateList',JSON.stringify(this.messageDetails));
  // }


  notifyEmployees: string[] = [
    'Danny Goyal',
    'Matt Gierut',
    'Keval Baxi',
  ];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  searchInput = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.notifyEmployees.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.notifyEmpCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.notifyEmployees.push(event.option.viewValue);
    this.notifyEmpInput.nativeElement.value = '';
    this.notifyEmpCtrl.setValue(null);
  }

  remove(emp: string): void {
    const index = this.notifyEmployees.indexOf(emp);

    if (index >= 0) {
      this.notifyEmployees.splice(index, 1);
    }
  }

  onSubmit() {
    const params: AddTemplate = {
      title: this.templateList.value.title,
      body: this.templateList.value.body,
      project: 2
    }
    this.messageService.postMessage(params).subscribe(res => {
      if (res) {
        console.log("resss", res);
      }
    }, (error) => {
      console.log('errror', error);

    });


  }

  showSearchInput() {
    if (!this.searchInput) {
      this.searchInput = true;
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEmps.filter(emp => emp.toLowerCase().indexOf(filterValue) === 0);
  }
//for list of company user
 
    getCompanyUser(owner ) {
      // this.loaderService.show();
       this.owner = owner;
      const params: userListModel = { companyId: '1', inOwnerCompany: this.owner, project :2}
      this.userService.companyUserList(params).subscribe((res: any) => {
        if (res.body) {
          this.users = {
            
            data: res.body.results || []
          }
          console.log("resss",this.users.data)
        } else {
          this.users = {
            
            data: []
          }
        }
        
      }, (error) => { 
        console.log("error",error);
      })
    }

    //for dialog switch to template
    animal: string;
   // name: string;
  
  
  
    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '380px',
        height :'355px',
        data: { animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

    openFileDialog():void{
      const dialogRef = this.dialog.open(AttachFileDialog, {
        width: '570px',
        height :'310px',
        data: { animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls:['./dialog-overview-example-dialog.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log("i am called")
  }

}


//for attach file
@Component({
  selector: 'attach-file-dialog',
  templateUrl: 'attach-file-dialog.html',
  styleUrls:['./attach-file-dialog.css']
})
export class AttachFileDialog {

  constructor(
    public dialogRef: MatDialogRef<AttachFileDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log("i am called")
  }

}
