import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-template',
  templateUrl: './view-template.component.html',
  styleUrls: ['./view-template.component.css']
})
export class ViewTemplateComponent implements OnInit {

  // templateList =JSON.parse (localStorage.getItem('TemplateList')); 
  constructor() { }

  ngOnInit(): void {
    
  }

  
}
