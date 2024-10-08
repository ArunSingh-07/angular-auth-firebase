import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          usernames: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      
      // Log the current value of the signal
      console.log(this.authService.currentUserSig());
    });
  }
  logout(): void {
    this.authService.logout();

}}
