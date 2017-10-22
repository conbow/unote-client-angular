import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NoteComponent } from './note.component';
import { NoteResolver } from './note-resolver.service';
import { MarkdownPipe } from './markdown.pipe';
import { SharedModule } from '../shared';

const noteRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'notes/:id',
    component: NoteComponent,
    resolve: {
      note: NoteResolver
    }
  }
]);

@NgModule({
  imports: [noteRouting, SharedModule],
  declarations: [NoteComponent, MarkdownPipe],

  providers: [NoteResolver]
})
export class NoteModule {}
