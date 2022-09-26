import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from './todo/todo.component';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
const routes: Routes = [
  
  {path:"", component: TodoComponent },
  {path:'items', component:TodoItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
