import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AnimatedTextActions = createActionGroup({
  source: 'Animated Text',
  events: {
    'Start Animation': emptyProps(),
    'Tick': emptyProps(),
    'Set Display Text': props<{ text: string }>(),
    'Toggle Deleting': props<{ isDeleting: boolean }>(),
    'Advance Phrase': emptyProps(),
  },
});
