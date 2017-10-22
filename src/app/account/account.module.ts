import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountComponent } from './account.component';
import { AuthGuard, SharedModule } from '../shared';

const accountRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard]
  }
]);

@NgModule({
  imports: [SharedModule, accountRouting],
  declarations: [AccountComponent]
})
export class AccountModule {}
