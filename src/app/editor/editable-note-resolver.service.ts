import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Note, NotesService } from '../shared';

@Injectable()
export class EditableNoteResolver implements Resolve<Note> {
  constructor(private notesService: NotesService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.notesService
      .get(route.params['id'])
      .catch(err => this.router.navigateByUrl('/'));
  }
}
