import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

interface Friend {
  id: string;
  username: string;
}

interface Message {
  sender: string;
  senderName: string;
  text: string;
  timestamp: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css'],
  imports: [FormsModule]
})
export class HomeComponent implements OnInit {
  searchControl = new FormControl('');
  friends$: Observable<Friend[]> = of([]);
  filteredFriends$: Observable<Friend[]> = this.friends$;
  messages$: Observable<Message[]> = of([]);
  newMessage = '';
  selectedFriend: Friend | null = null;
  userId: string = 'currentUserId'; // Replace with actual user ID
  userName: string = 'Current User'; // Replace with actual user name

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    // Load friends
    this.friends$ = this.firestore.collection<Friend>('users').valueChanges({ idField: 'id' });

    // Filter friends based on search term
    this.filteredFriends$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(searchTerm => 
        this.firestore.collection<Friend>('users', ref =>
          ref.where('username', '>=', searchTerm).where('username', '<=', searchTerm + '\uf8ff')
        ).valueChanges({ idField: 'id' })
      )
    );
  }

  // selectFriend(friend: Friend): void {
  //   this.selectedFriend = friend;
  //   this.loadMessages();
  // }

  // loadMessages(): void {
  //   if (this.selectFriend) {
  //     const messagesFromUser$ = this.firestore.collection<Message>('messages', ref =>
  //       ref.where('sender', '==', this.userId)
  //         .orderBy('timestamp')
  //     ).valueChanges();
  
  //     const messagesFromFriend$ = this.firestore.collection<Message>('messages', ref =>
  //       ref.where('sender', '==', this.selectFriend.id) // Only access id if selectedFriend is not null
  //         .orderBy('timestamp')
  //     ).valueChanges();
  
  //     this.messages$ = combineLatest([messagesFromUser$, messagesFromFriend$]).pipe(
  //       map(([userMessages, friendMessages]) => 
  //         [...userMessages, ...friendMessages].sort((a, b) => a.timestamp - b.timestamp)
  //       )
  //     );
  //   }
  // }
  

  sendMessage(): void {
    if (this.newMessage.trim() !== '' && this.selectedFriend) {
      const message: Message = {
        sender: this.userId,
        senderName: this.userName,
        text: this.newMessage,
        timestamp: new Date()
      };
      this.firestore.collection('messages').add(message)
        .then(() => {
          this.newMessage = ''; // Clear the input field after sending
        })
        .catch(error => {
          console.error("Error sending message: ", error);
        });
    }
  }
}


















// import { Component, OnInit } from '@angular/core';
// import { User } from '../services/user.service';
// import { UserService } from '../services/user.service';
// import firebase from 'firebase/compat/app'
// import { Observable, of } from 'rxjs';
// import { FormControl } from '@angular/forms';
// // import { Friend, Message } from './home.component.interfaces';


// interface Friend {
//   id: string;
//   username: string;
// }

// interface Message {
//   sender: string;
//   senderName: string;
//   text: string;
//   timestamp: any;
// }

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [],
//   templateUrl:'./home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent implements OnInit{

//   currentUser: firebase.User &{ username?: string }| null = null; // Use Firebase User type
//   userId: string | null = null; // Add userId property
//   searchTerm = '';
//   friends: Observable <Friend[]> = of([]);
//   messages: Observable<Message[]> = of([]);
//   newMessage = '';
//   selectedFriend: Friend | null = null;

//   user$ = this.userService.currentUser;

//   searchControl = new FormControl('')

//   constructor(private userService: UserService) {}

//   ngOnInit(): void {
//     this.userService.currentUser().subscribe(user => {
//       this.currentUser = user;
//       if (user) {
//         this.userId = user.uid;
//         // Additional logic based on current user
//       }
//     });
//   }
// }


