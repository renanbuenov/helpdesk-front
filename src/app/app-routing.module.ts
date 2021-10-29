import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { TechnicianCreateComponent } from './components/technician/technician-create/technician-create.component';
import { TechnicianUpdateComponent } from './components/technician/technician-update/technician-update.component';
import { TechnicianListComponent } from './components/technician/technician-list/technician-list.component';
import { TechnicianDeleteComponent } from './components/technician/technician-delete/technician-delete.component';
import { ClientDeleteComponent } from './components/client/client-delete/client-delete.component';
import { ClientUpdateComponent } from './components/client/client-update/client-update.component';
import { ClientCreateComponent } from './components/client/client-create/client-create.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'technicians',            component: TechnicianListComponent },
      { path: 'technicians/create',     component: TechnicianCreateComponent },
      { path: 'technicians/update/:id', component: TechnicianUpdateComponent },
      { path: 'technicians/delete/:id', component: TechnicianDeleteComponent },

      { path: 'clients',                component: ClientListComponent },
      { path: 'clients/create',         component: ClientCreateComponent },
      { path: 'clients/update/:id',     component: ClientUpdateComponent },
      { path: 'clients/delete/:id',     component: ClientDeleteComponent },

      { path: 'tickets',                component: TicketListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
