import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ListComponent} from './users/list/list.component';
import {CreateComponent} from './users/create/create.component';
import {EditComponent} from './users/edit/edit.component';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'create', component: CreateComponent},
  {path: 'edit', component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
