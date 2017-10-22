import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Note, NotesService } from '../shared';

@Component({
  selector: 'notes-page',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {
  notes: Note[];
  isLoading: boolean = false;

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    // Load notes
    this.isLoading = true;
    this.notesService.getAll().subscribe(notes => {
      this.isLoading = false;
      this.notes = notes;
    });
  }
}
