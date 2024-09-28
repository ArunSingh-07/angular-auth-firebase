
import { RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent {
  authService = inject(AuthService );
  router = inject(Router);

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
    this.router.navigate(['/login']);
}

}
