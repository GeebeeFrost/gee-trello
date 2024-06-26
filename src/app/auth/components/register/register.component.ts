import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../types/registerRequest.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  errMsg: string | null = null;
  form = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    this.authService.register(this.form.value as RegisterRequest).subscribe({
      next: (currentUser) => {
        this.authService.setToken(currentUser);
        this.authService.setCurrentUser(currentUser);
        this.errMsg = null;
        this.router.navigateByUrl('/');
      },
      error: (err: HttpErrorResponse) => {
        this.errMsg = err.error.join(', ');
      },
    });
  }
}
