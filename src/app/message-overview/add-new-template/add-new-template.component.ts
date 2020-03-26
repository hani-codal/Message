import { Component, OnInit } from '@angular/core';
import {AddTemplate} from '../message-overview.model';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-add-new-template',
  templateUrl: './add-new-template.component.html',
  styleUrls: ['./add-new-template.component.css']
})
export class AddNewTemplateComponent implements OnInit {

  messageDetails : AddTemplate[] = (JSON.parse(localStorage.getItem('TemplateList'))) || [];
  //messageDetail : AddTemplate;
  fileToggle = false;
  
  templateList = this.fb.group({
    name :[''],
    discription :['']
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
      console.log((JSON.parse(localStorage.getItem('TemplateList'))))
  }
  postMessage(){
   // this
   //alert("hani")
   //console.log(this.templateList.value)
   // this.messageDetail.name = this.name.toString();
    //console.log(this.messageDetail.name)
    
  }
  onSubmit(){
    console.log(this.templateList.value)
    this.messageDetails.push(this.templateList.value);
    console.log(this.messageDetails) 
    localStorage.setItem('TemplateList',JSON.stringify(this.messageDetails));
  }
  expandFile(){
    if(!this.fileToggle){
      this.fileToggle = true;
      return;
    }
  }
  fileUpload(){
    document.getElementById("fileSelect").click();
    }
  


  
}
