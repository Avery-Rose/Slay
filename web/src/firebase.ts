import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAorS9XPIazx_dyX77Ne9FtU3SW4F7b4Ao',
  authDomain: 'slay-bot.firebaseapp.com',
  projectId: 'slay-bot',
  storageBucket: 'slay-bot.appspot.com',
  messagingSenderId: '783783897644',
  appId: '1:783783897644:web:46127058645751404d7f89',
};

export const app = initializeApp(firebaseConfig);
