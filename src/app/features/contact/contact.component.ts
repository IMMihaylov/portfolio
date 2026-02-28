import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { ContactActions } from '../../store/contact/contact.actions';
import { selectStatus, selectError } from '../../store/contact/contact.reducer';
import { ScrollAnimateDirective } from '../../shared/directives/scroll-animate.directive';
import type { ContactFormValue } from '../../store/contact/contact.actions';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [AsyncPipe, NgClass, ReactiveFormsModule, ScrollAnimateDirective],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  readonly status$ = this.store.select(selectStatus);
  readonly error$ = this.store.select(selectError);

  readonly form = this.fb.nonNullable.group({
    name:    ['', [Validators.required, Validators.minLength(2)]],
    email:   ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      ContactActions.submitForm({ form: this.form.getRawValue() as ContactFormValue }),
    );
  }

  reset(): void {
    this.form.reset();
    this.store.dispatch(ContactActions.resetForm());
  }

  isInvalid(field: 'name' | 'email' | 'message'): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control.touched);
  }
}
