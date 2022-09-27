import { Component, Renderer2,HostListener, OnInit, OnChanges, SimpleChanges, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import { StorageServiceService } from '../storage-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
('@angular/core');
import { TodoList } from "../todo-item";
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TodoComponent implements OnInit,OnChanges {

  @ViewChild('title', { static: false })addtask: ElementRef<HTMLInputElement> = {} as ElementRef;
  public todoItems: TodoList[] = [];
  public completed:TodoList[] = [];
  public pending:TodoList[] = [];
  public target:any;
  public addTask:boolean = false;
  public addedTask:any;
  public sections:string = "Pending";
  public isTaskDone:any = false;
  

  constructor(private renderer: Renderer2, private stService:StorageServiceService,private _snackBar: MatSnackBar) { 
    this.renderer.listen('window', 'click',(e:Event)=>{this.target = e.target;});
  }

  ngOnChanges(changes: SimpleChanges): void {
   this.stService.setData('tasks', this.todoItems);
  }

  ngOnInit() {
    this.todoItems = this.stService.getData('tasks');
    this.todoItems = this.getSectionData(this.todoItems);
    if(Object.keys(this.stService.getData('tasks')).length === 0){
        this.stService.setData('tasks', this.todoItems);
    }
  }

  handleEdit(event:TodoList) {
    this.todoItems = this.todoItems.map((todo:TodoList) => {
      if (todo.id === event.id) {
        todo = {...todo, ...event};
        this.stService.setData('tasks', this.todoItems);

        let isComplete;
        if(todo.isDone == true){
          isComplete = "Completed/Done";
        }else{
          isComplete = "Pending/Undone";
        }
        if(todo.change == 'check'){
          this.openSnackBar(todo.name+" is "+isComplete, 'OK');
        }
      }
      return todo;
    });
  }

  handleRemove(event:TodoList) {
    this.todoItems = this.todoItems.filter((todo:TodoList) => {
      return todo.id !== event.id;
    });
    this.stService.setData('tasks', this.todoItems);
    this.getSectionData(this.todoItems);
  }

  public addTodoItem(val:string){
    if(this.addTask){
      this.addTask = false;
      if(!val){
        this.openSnackBar("Please add valid task", 'OK');
      }else{
          if(this.stService.getData('tasks')){
            let items = this.stService.getData('tasks');
            
            if(items){
              let addedItem = {id: items.length, name: val, isDone:false, change:'added', description:''};
              items.unshift(addedItem);
              this.todoItems = items;
              this.stService.setData('tasks', this.todoItems);
              this.getSectionData(this.todoItems);
            }
          }
      }
    }else{this.addTask = true;}
  };

  public checkSections(val:any){
    this.isTaskDone = true;
    if(val){this.sections = val;};
    this.stService.setData('tasks', this.todoItems);
    this.todoItems = this.getSectionData(this.stService.getData('tasks'));
  }

  public getSectionData(data:TodoList[]){
    if(data.length != 0){
      if(this.sections == 'Pending'){
        this.pending = data.filter((todo:TodoList) => {
          return todo.isDone == false;
        });
      }else if(this.sections == 'Completed'){
        this.completed= data.filter((todo:TodoList) => {
          return todo.isDone == true;
        });
      }
    }
    return data;
  }

  public selectSections(val:string){
    if(val){this.sections = val;};
    this.todoItems = this.getSectionData(this.stService.getData('tasks'));
  }
  
  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 1000,});
  }

  public clearStorageData(){
    this.todoItems = [];
    this.pending = [];
    this.completed = [];
    localStorage.clear();
  }
}
