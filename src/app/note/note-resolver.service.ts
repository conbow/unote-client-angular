import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Note, NotesService, AccountService } from '../shared';

@Injectable()
export class NoteResolver implements Resolve<Note> {
  constructor(
    private notesService: NotesService,
    private router: Router,
    private accountService: AccountService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.notesService
      .get(route.params['id'])
      .catch(err => this.router.navigateByUrl('/'));
  }
}
