import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/feature/auth/services/auth.service';
import { ProfileService } from '../profile/services/profile.service';
import { IProfile } from '../profile/models/IProfile';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  user!:IProfile
  profileImage = ''
  baseUrl = environment.baseUrl
  constructor(private profileService: ProfileService,
    private toast: ToastrService,
    private authService: AuthService) {
  }
  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe({
      next: (user: IProfile) => {
        this.user = user;
        this.profileImage = this.baseUrl + user.imagePath;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
  }

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
