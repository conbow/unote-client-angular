import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NoteModule } from './note/note.module';
import { NotesModule } from './notes/notes.module';
import { EditorModule } from './editor/editor.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { AccountModule } from './account/account.module';
import {
  ApiService,
  NotesService,
  AuthGuard,
  FooterComponent,
  HeaderComponent,
  SessionService,
  ProfilesService,
  SharedModule,
  AccountService
} from './shared';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([], {
  useHash: true
});

@NgModule({
  declarations: [AppComponent, FooterComponent, HeaderComponent],
  imports: [
    BrowserModule,
    EditorModule,
    NoteModule,
    NotesModule,
    AuthModule,
    HomeModule,
    rootRouting,
    SharedModule,
    AccountModule
  ],
  providers: [
    ApiService,
    NotesService,
    AuthGuard,
    SessionService,
    ProfilesService,
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
