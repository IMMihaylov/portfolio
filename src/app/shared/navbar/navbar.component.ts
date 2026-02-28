import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Store } from '@ngrx/store';
import { UiActions } from '../../store/ui/ui.actions';
import { selectActiveSection, selectMobileMenuOpen } from '../../store/ui/ui.reducer';

interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly store = inject(Store);

  readonly activeSection$ = this.store.select(selectActiveSection);
  readonly mobileMenuOpen$ = this.store.select(selectMobileMenuOpen);

  readonly navLinks: NavLink[] = [
    { id: 'about',      label: 'About'      },
    { id: 'skills',     label: 'Skills'     },
    { id: 'experience', label: 'Experience' },
    { id: 'education',  label: 'Education'  },
    { id: 'contact',    label: 'Contact'    },
  ];

  toggleMenu(): void {
    this.store.dispatch(UiActions.toggleMobileMenu());
  }

  closeMenu(): void {
    this.store.dispatch(UiActions.closeMobileMenu());
  }

  scrollTo(sectionId: string): void {
    this.closeMenu();
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}
