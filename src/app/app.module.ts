import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataService } from './data.service';
import { LoadingComponent } from './loading/loading.component';
import { HostsComponent } from './hosts/hosts.component';
import { HostViewComponent } from './host-view/host-view.component';

// third party includes
import { OrderModule } from 'ngx-order-pipe';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'hosts',
    component: HostViewComponent,
    data: { title: 'Hosts' }
  },
  { path: 'index',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DashboardComponent,
    LoadingComponent,
    HostsComponent,
    HostViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
      // ,{ enableTracing: false } // <-- debugging purposes only
    ),
    OrderModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
