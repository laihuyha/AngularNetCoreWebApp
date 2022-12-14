import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, of, switchMap, timer } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errors: string[] = [];

  // Form Builder : Services provided by Angular helps to create forms more easily
  constructor(private formBuilder: FormBuilder, private accountServices: AccountService, private router: Router, private toaster: ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      displayName: [null, [Validators.required]], // displayName is the name User will see
      email: [null, [Validators.required, Validators.email], [this.validateEmail()]], // email is the email User will use to login
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]] // password is the password User will use to login
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
    this.accountServices.register(this.registerForm.value).subscribe(response => {
      this.toaster.success("Register successfully", "Success", { timeOut: 3000 }).onHidden.subscribe(() => {
        this.router.navigateByUrl('/shop');
      });
    }, error => {
      console.log(error);
      this.errors = error.errors;
      // this.toaster.error(error.errors.first(), "Error", { timeOut: 3000 });
    });
  }

  validateEmail(): AsyncValidatorFn {
    // Trả về giá trị  của validator emailExists
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          // switchMap, mergeMap: Chuyển đối giá trị từ 1 Observable gốc sang 1 Observable khác
          // Khác nhau giưa switchMap và mergeMap là switchMap sẽ hủy các Observable trước đó khi có Observable mới
          // Còn mergeMap sẽ không hủy các Observable trước đó mà sẽ chạy song song tới khi kết thúc
          if (!control.value) {
            return of(null);
          }
          return this.accountServices.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? { emailExists: true } : null;
            })
          )
        })
      )
    }
  }
}
