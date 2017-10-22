import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditableNoteResolver } from './editable-note-resolver.service';
import { AuthGuard, SharedModule } from '../shared';

const editorRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'notes/create',
    component: EditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notes/:id/edit',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      note: EditableNoteResolver
    }
  }
]);

@NgModule({
  imports: [editorRouting, SharedModule],
  declarations: [EditorComponent],
  providers: [EditableNoteResolver]
})
export class EditorModule {}
