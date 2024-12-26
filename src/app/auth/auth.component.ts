import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  private readonly fb = inject(FormBuilder)
  private readonly _authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  loginForm!:FormGroup
  showPassword:boolean = false
  isLoading:boolean = false
  resMsg:string = ''
  constructor(){
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]],
    });
  }

  login(){
    this.isLoading = true
    this._authService.login(this.loginForm.value).subscribe({
      next: (res:any) => {
        this.isLoading = false;
        localStorage.setItem('userToken', res.token)
        console.log(this._authService.getProfile())
      },
      error: (err) =>{
        this.isLoading = false
        this.toastr.error(err.error.message, 'Error')
      },
      complete: () => {
        this.toastr.success("You are successfully logged in", 'Successfully')
        localStorage.removeItem('email')
      }
    })
  }

  toggleShowPass(): void{
    this.showPassword = !this.showPassword
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
