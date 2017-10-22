import { Component, Input } from '@angular/core';

import { Note } from '../models';

@Component({
  selector: 'note-meta',
  templateUrl: './note-meta.component.html'
})
export class NoteMetaComponent {
  @Input() note: Note;
}
