import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import { TodoList } from "../../todo-item";
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, OnChanges{



  @Input() todo: any;
  @Input() target:any;
  @Output() edit = new EventEmitter<TodoList>();
  @Output() ischange = new EventEmitter<string>();
  @ViewChild('input', { static: false })input: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild('title', { static: false })title: ElementRef<HTMLInputElement> = {} as ElementRef;

  @Output() remove = new EventEmitter<TodoList>();
  public completed:any;
  public isChecked:boolean = false;
  public isEditing:boolean = false;
  public istextarea:any = false;
  public strikeit:any = false;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  
  }
  ngOnInit(): void {
    this.todo = {...this.todo};
  }
  public checkTick(e:any, item:any){
    this.todo.isDone = e.target.checked;
    this.strikeit = true;
    this.todo.change='check';
    this.edit.emit(this.todo);
    console.log(e.target.checked, item.name);
  };
  public startEdit(){
    this.isEditing = true;
  };
  public onTitleChange(value: string, ele:string) {
    this.todo.change='title';
    if(ele="desc"){
      this.todo.description = value;
    }else{
      this.todo.name = value;
    }
    this.edit.emit(this.todo);
  };
  public onDelete(){
      this.remove.emit(this.todo);
  };
  public saveChanges(){
    this.isEditing=false;
    
  };
  public updatechange(){
    this.ischange.emit();
  }
  public editinTextArea(){
    this.istextarea=!this.istextarea;
  }
}
