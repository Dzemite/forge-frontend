import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'forge-login-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslocoPipe,
  ],
  template: `
    <section class="min-h-[calc(100dvh-var(--header-height))] grid place-items-center px-5 py-10">
      <div class="w-full max-w-[520px] forge-surface forge-surface--loose">
        <h1 class="text-2xl font-black">{{ 'login.title' | transloco: {} : 'auth' }}</h1>
        <p class="mt-2 text-white/80">{{ 'login.subtitle' | transloco: {} : 'auth' }}</p>

        <form class="mt-5 grid gap-3" [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>{{ 'login.email' | transloco: {} : 'auth' }}</mat-label>
            <input matInput formControlName="email" autocomplete="email" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>{{ 'login.password' | transloco: {} : 'auth' }}</mat-label>
            <input
              matInput
              [type]="passwordVisible() ? 'text' : 'password'"
              formControlName="password"
              autocomplete="current-password"
            />
            <button
              mat-icon-button
              matSuffix
              type="button"
              (click)="togglePasswordVisibility()"
              [attr.aria-label]="
                passwordVisible()
                  ? ('login.hidePassword' | transloco: {} : 'auth')
                  : ('login.showPassword' | transloco: {} : 'auth')
              "
            >
              <mat-icon>{{ passwordVisible() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>

          <button
            mat-raised-button
            type="submit"
            class="!rounded-xl !font-black"
            [disabled]="form.invalid || isLoading()"
          >
            {{ 'login.submit' | transloco: {} : 'auth' }}
          </button>

          <a class="text-center font-bold text-white/80 hover:text-white" routerLink="/auth/register">
            {{ 'login.toRegister' | transloco: {} : 'auth' }}
          </a>
        </form>
      </div>
    </section>
  `,
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoading = this.auth.status;
  protected readonly passwordVisible = signal(false);

  protected readonly form = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  togglePasswordVisibility(): void {
    this.passwordVisible.update((v) => !v);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    // Note: credentials are not used in mock backend yet.
    await this.auth.login();
    await this.router.navigateByUrl('/platform');
  }
}
