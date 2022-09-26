import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoList } from '../todo-item';
import { StorageServiceService } from '../storage-service.service';
@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnInit {
  @Output() sections = new EventEmitter<string>();
public todoList:TodoList[]=[];
 
  constructor(private stService:StorageServiceService) { }

  ngOnInit(): void {
    
    this.todoList = this.stService.getData('tasks');
    console.log(this.todoList);
  }
  public selectSections(val:string){
    this.sections.emit(val);
  }


}
