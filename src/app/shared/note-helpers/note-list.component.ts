import { Component, Input } from '@angular/core';

import { Note, NoteListConfig } from '../models';
import { NotesService } from '../services';

@Component({
  selector: 'note-list',
  templateUrl: './note-list.component.html'
})
export class NoteListComponent {
  constructor(private notesService: NotesService) {}

  @Input() limit: number;
  @Input()
  set config(config: NoteListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: NoteListConfig;
  results: Note[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.notesService.getAll().subscribe(notes => {
      this.loading = false;
      this.results = notes;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(
        new Array(Math.ceil(notes.length / this.limit)),
        (val, index) => index + 1
      );
    });
  }
}
