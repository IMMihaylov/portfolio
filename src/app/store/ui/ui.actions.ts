import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'UI',
  events: {
    'Set Active Section': props<{ section: string }>(),
    'Toggle Mobile Menu': emptyProps(),
    'Close Mobile Menu': emptyProps(),
    'Update Scroll Position': props<{ scrollY: number }>(),
  },
});
