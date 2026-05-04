import { Directive } from '@angular/core';

@Directive({
  selector: '[storyForeground]',
  standalone: true,
})
export class StoryForegroundDirective {}

@Directive({
  selector: '[storyBackground]',
  standalone: true,
})
export class StoryBackgroundDirective {}
