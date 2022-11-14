import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePartyComponent } from './create-party/create-party.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'singup',
    component: SignupComponent,
  },
  {
    path: 'create-party',
    component: CreatePartyComponent,
  },
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    component: HomepageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
