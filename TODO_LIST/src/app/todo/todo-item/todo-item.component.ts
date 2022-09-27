import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { TodoList } from "../../todo-item";
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit{

  @Input() todo: any;
  @Input() target:any;
  @Output() edit = new EventEmitter<TodoList>();
  @Output() ischange = new EventEmitter<string>();
  @Output() remove = new EventEmitter<TodoList>();
  @ViewChild('input', { static: false })input: ElementRef<HTMLInputElement> = {} as ElementRef;
  @ViewChild('title', { static: false })title: ElementRef<HTMLInputElement> = {} as ElementRef;

  public isEditing:boolean = false;
  public istextarea:boolean = false;
  constructor() { }

  ngOnInit(): void {this.todo = {...this.todo};}

  public checkTick(e:any, item:any){
    this.todo.isDone = e.target.checked;
    this.todo.change='check';
    this.edit.emit(this.todo);
  };

  public startEdit(val:string){
    if(val == 'edit'){
      this.isEditing = true;
    } else{
      this.isEditing = false;
    }
  };

  public onTitleChange(value: string, ele:string) {
    this.todo.change='title';
    if(ele=="desc"){
      this.todo.description = value;
    }else{
      this.todo.name = value;
    }
    this.edit.emit(this.todo);
  };

  public onDelete(){this.remove.emit(this.todo);};
  public updatechange(){this.ischange.emit();}
  public editinTextArea(){this.istextarea=!this.istextarea;}
}
