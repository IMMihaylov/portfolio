import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AnimatedTextActions } from '../../store/animated-text/animated-text.actions';
import { selectDisplayText } from '../../store/animated-text/animated-text.reducer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);

  readonly displayText$ = this.store.select(selectDisplayText);

  ngOnInit(): void {
    this.store.dispatch(AnimatedTextActions.startAnimation());
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
