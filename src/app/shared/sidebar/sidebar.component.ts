import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/feature/auth/services/auth.service';

interface IMenu {
  link: string;
  icon: string;
  text: string;
  isActive: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  private readonly _authService = inject(AuthService);
  isAdmin(): boolean {
    return this._authService.role == 'SuperAdmin';
  }
  isUser(): boolean {
    return this._authService.role == 'SystemUser';
  }
  menu: IMenu[] = [
    {
      link: 'dashboard/home',
      icon: 'home',
      text: 'home',
      isActive: this.isAdmin() || this.isUser(),
    },
    {
      link: 'dashboard/user',
      icon: 'users',
      text: 'users',
      isActive: this.isAdmin(),
    },
    {
      link: 'dashboard/admin/recipes',
      icon: 'recipes',
      text: 'recipes',
      isActive: this.isAdmin(),
    },
    {
      link: 'dashboard/admin/categories',
      icon: 'categories',
      text: 'categories',
      isActive: this.isAdmin(),
    },
    {
      link: 'dashboard/user-recipes',
      icon: 'recipes',
      text: 'user recipes',
      isActive: this.isUser(),
    },
    {
      link: 'dashboard/favorites',
      icon: 'fav',
      text: 'favorites',
      isActive: this.isUser(),
    }
  ];
}
