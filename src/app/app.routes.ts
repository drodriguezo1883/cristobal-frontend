import { Routes } from '@angular/router';
import { InfoComponent } from './pages/info/info.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
  { path: '', redirectTo: 'info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'registro', component: RegistroComponent },
];
