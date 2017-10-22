import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Note } from '../models';
import { NotesService, AccountService } from '../services';

@Component({
  selector: 'favorite-button',
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
  constructor(
    private notesService: NotesService,
    private router: Router,
    private accountService: AccountService
  ) {}

  @Input() note: Note;
  @Output() onToggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    this.accountService.isAuthenticated.subscribe(authenticated => {
      // Not authenticated? Push to login screen
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return;
      }

      // Favorite the note if it isn't favorited yet
      /*
        if (!this.note.favorited) {
          this.notesService.favorite(this.note.id)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(true);
            },
            err => this.isSubmitting = false
          );

        // Otherwise, unfavorite the note
        } else {
          this.notesService.unfavorite(this.note.id)
          .subscribe(
            data => {
              this.isSubmitting = false;
              this.onToggle.emit(false);
            },
            err => this.isSubmitting = false
          );
        }*/
    });
  }
}
