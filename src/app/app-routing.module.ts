import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'details/:id', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'affectations', loadChildren: './pages/affectation-details/affectation-details.module#AffectationDetailsPageModule' },
  { path: 'affectations/:id', loadChildren: './pages/affectation-details/affectation-details.module#AffectationDetailsPageModule' },
  { path: 'ordinateurs', loadChildren: './pages/ordinateur-details/ordinateur-details.module#OrdinateurDetailsPageModule' },
  { path: 'ordinateurs/:id', loadChildren: './pages/ordinateur-details/ordinateur-details.module#OrdinateurDetailsPageModule' },
  { path: 'utilisateurs', loadChildren: './pages/utilisateur-details/utilisateur-details.module#UtilisateurDetailsPageModule' },
  { path: 'utilisateurs/:id', loadChildren: './pages/utilisateur-details/utilisateur-details.module#UtilisateurDetailsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
