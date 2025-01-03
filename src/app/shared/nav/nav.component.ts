import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  get username() {
    return localStorage.getItem('userName');
  }

  logout(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('role')
    localStorage.removeItem('userName')
    localStorage.removeItem('email')

  }
}
