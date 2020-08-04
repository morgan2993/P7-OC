import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
  <app-header
    [isLogged]="auth.isLogged"
    [isAdmin]="auth.isAdmin"
    [userData]="auth.store | async">
  </app-header>
  <div class="header-height-placeholder"></div>
  <div class="main-content">
    <router-outlet></router-outlet>
  </div>`,
  styles: [`
  :host {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
