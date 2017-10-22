import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Note, NotesService } from '../shared';

@Component({
  selector: 'editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  note: Note = new Note();
  noteForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Use the FormBuilder to create a form group
    this.noteForm = this.fb.group({
      title: '',
      body: ''
    });
    // Optional: subscribe to value changes on the form
    // this.noteForm.valueChanges.subscribe(value => this.updateNote(value));
  }

  ngOnInit() {
    // If there's a note prefetched, load it
    this.route.data.subscribe((data: { note: Note }) => {
      if (data.note) {
        this.note = data.note;
        this.noteForm.patchValue(data.note);
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateNote(this.noteForm.value);

    // post the changes
    this.notesService.save(this.note).subscribe(
      note => this.router.navigateByUrl('/notes/' + note.id),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateNote(values: Object) {
    (<any>Object).assign(this.note, values);
  }
}
