import { Injectable } from '@angular/core';
import { TodoList } from "./todo-item";
@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }
  public setData(key:string, value:any){
    localStorage.setItem(key,JSON.stringify(value));
  }
  public getData(key:string):any{
    return JSON.parse(localStorage.getItem(key) || '[]');
  }
}
