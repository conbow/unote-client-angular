import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { Note, NoteListConfig } from '../models';

@Injectable()
export class NotesService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<Note[]> {
    return this.apiService.get('/notes');
  }

  get(id): Observable<Note> {
    return this.apiService.get('/notes/' + id);
  }

  destroy(id) {
    return this.apiService.delete('/notes/' + id);
  }

  save(note): Observable<Note> {
    // If we're updating a note use put, otherwise post
    if (note.id) {
      return this.apiService.put('/notes/' + note.id, note);
    } else {
      return this.apiService.post('/notes', note);
    }
  }
}
