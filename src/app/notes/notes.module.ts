import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotesComponent } from './notes.component';
import { AuthGuard, SharedModule } from '../shared';

const notesRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [SharedModule, notesRouting],
  declarations: [NotesComponent]
})
export class NotesModule {}
