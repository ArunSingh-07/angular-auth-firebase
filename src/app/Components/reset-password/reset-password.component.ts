import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
   // Function to handle the reset password logic
   resetPassword() {
    // Add your reset password logic here
    alert('Password reset initiated!');
  }
}
