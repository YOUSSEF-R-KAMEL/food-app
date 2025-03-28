import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-acount',
  templateUrl: './verify-acount.component.html',
  styleUrls: ['./verify-acount.component.scss']
})
export class VerifyAcountComponent {

  verifyCountForm!:FormGroup;
  resMsg:string = ''
  isLoading:boolean = false
  private readonly fb = inject(FormBuilder)
  private readonly _authService = inject(AuthService)
  private readonly toastr = inject(ToastrService)
  private readonly router = inject(Router)
  constructor(){
    this.verifyCountForm = this.fb.group({
      email: [localStorage.getItem('email'), [Validators.email, Validators.required]],
      code: [null, [Validators.required]],
    })
  }
  sendReq(){
    this.isLoading = true
    this._authService.verifyAccount(this.verifyCountForm.value).subscribe({
      next: (res:any) => {
        this.isLoading = false
        this.resMsg = res.message
      },
      error: (err) =>{
        this.toastr.error(err.error.message, 'Error')
      },
      complete: () => {
        this.toastr.success(this.resMsg,'Successfully')
        console.log(this.verifyCountForm.get('email')?.value)
        this.router.navigateByUrl('/auth/login')
      }
    })
  }
  get email() {
    return this.verifyCountForm.get('email');
  }

  get code() {
    return this.verifyCountForm.get('code');
  }

}
