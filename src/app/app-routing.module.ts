import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpolyeComponent } from './empolye/empolye.component';

const routes: Routes = [
  {
    path: 'employe',
    component: EmpolyeComponent,
  },
  {
    path: '',
    redirectTo: 'employe',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
