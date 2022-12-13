import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private accountService: AccountService, private toast: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm = () => {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit = () => {
    console.log(this.loginForm.get('password'));
    this.accountService.login(this.loginForm.value).subscribe(response => {
      console.log("Logged in successfully");
      this.toast.success("Logged in successfully", "Success", { timeOut: 3000 }).onHidden.subscribe(() => {
        this.router.navigateByUrl('/shop');
      });
    }, error => {
      console.log(error);
    });
  }
}
