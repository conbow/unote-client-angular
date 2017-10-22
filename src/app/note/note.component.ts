import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Note, NotesService } from '../shared';

@Component({
  selector: 'note-page',
  templateUrl: './note.component.html'
})
export class NoteComponent implements OnInit {
  note: Note;
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private router: Router
  ) {}

  ngOnInit() {
    // Retreive the prefetched note
    this.route.data.subscribe((data: { note: Note }) => {
      this.note = data.note;
    });
  }

  deleteNote() {
    this.isDeleting = true;

    this.notesService.destroy(this.note.id).subscribe(success => {
      this.router.navigateByUrl('/notes');
    });
  }
}
