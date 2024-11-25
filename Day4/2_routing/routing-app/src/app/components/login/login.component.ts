import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { AuthenticatorService } from 'src/app/services/authenticator.service';
import { fadeInAnimation } from 'src/app/utilities/animations/fade-in.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  returnUrl?: string;
  message?: string;
  login_sub?: Subscription;

  constructor(private formBuilder: FormBuilder, private authenticatorService: AuthenticatorService,
    private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm?.controls; }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticatorService.logout();
  }

  onSubmit(e: Event) {
    if (this.loginForm.valid) {
      this.login_sub = this.authenticatorService.login(this.f['username'].value, this.f['password'].value)
        .pipe(first()).subscribe({
          next: _ => {
            this.router.navigate([this.returnUrl]);
          }, error: err => {
            this.message = err;
          }
        });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.login_sub?.unsubscribe();
  }
}
