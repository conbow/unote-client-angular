import { Component, Input } from '@angular/core';

import { Note } from '../models';

@Component({
  selector: 'note-preview',
  templateUrl: './note-preview.component.html'
})
export class NotePreviewComponent {
  @Input() note: Note;

  onToggleFavorite(favorited: boolean) {
    this.note['favorited'] = favorited;

    if (favorited) {
      this.note['favoritesCount']++;
    } else {
      this.note['favoritesCount']--;
    }
  }
}
