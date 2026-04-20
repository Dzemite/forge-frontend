import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'forge-register-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  template: `
    <section class="min-h-[calc(100dvh-var(--header-height))] grid place-items-center px-5 py-10">
      <div class="w-full max-w-[520px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
        <h1 class="text-2xl font-black">Регистрация</h1>
        <p class="mt-2 text-white/80">MVP: создаём cookie-сессию (пока мок API).</p>

        <form class="mt-5 grid gap-3" [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Имя</mat-label>
            <input matInput formControlName="name" autocomplete="name" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" autocomplete="email" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Пароль</mat-label>
            <input matInput type="password" formControlName="password" autocomplete="new-password" />
          </mat-form-field>

          <button
            mat-raised-button
            type="submit"
            class="!rounded-xl !font-black"
            [disabled]="form.invalid || isLoading()"
          >
            Создать аккаунт
          </button>

          <a class="text-center font-bold text-white/80 hover:text-white" routerLink="/auth/login">
            Уже есть аккаунт? Войти
          </a>
        </form>
      </div>
    </section>
  `,
})
export class RegisterPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isLoading = this.auth.status;

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  async onSubmit(): Promise<void> {
    if (this.form.invalid) return;

    // Note: credentials are not used in mock backend yet.
    await this.auth.register();
    await this.router.navigateByUrl('/platform');
  }
}
