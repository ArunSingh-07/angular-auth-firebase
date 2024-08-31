import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

import { provideAuth ,getAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDxyo6MBRmdqVy5RBX0s4rQFOMq0SaTqiM",
  authDomain: "chat-and-auth-8a1ff.firebaseapp.com",
  projectId: "chat-and-auth-8a1ff",
  storageBucket: "chat-and-auth-8a1ff.appspot.com",
  messagingSenderId: "654439362407",
  appId: "1:654439362407:web:9df353cd6f1f3c43f889c2",
  measurementId: "G-M3V3KJZTMF"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    importProvidersFrom([provideFirebaseApp(()=> initializeApp(firebaseConfig)),
      provideAuth(()=> getAuth())
     ]),
  ],
};