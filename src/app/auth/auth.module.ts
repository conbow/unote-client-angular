import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { AuthGuard, SharedModule } from '../shared';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'account/login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'account/logout',
    component: AuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'account/sign-up',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [authRouting, SharedModule],
  declarations: [AuthComponent],
  providers: [NoAuthGuard]
})
export class AuthModule {}
