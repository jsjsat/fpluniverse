import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniverseComponent } from './component/universe.component';

const routes: Routes = [{
    component: UniverseComponent,
    path: '',
  }];

  @NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)],
  })
  export class UniverseRouting {
  }
