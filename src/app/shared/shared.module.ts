import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SpinnerComponent,
    SidebarComponent,
    NavComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent,
    SidebarComponent,
    NavComponent,
    HomeComponent
  ]
})
export class SharedModule { }
