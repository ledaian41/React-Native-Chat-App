import firebase from 'firebase'; // 4.8.1

/**
 * Replace by your Firebase config
 *
 */
firebase.initializeApp({
  apiKey: '***',
  authDomain: '***',
  databaseURL: '***',
  projectId: '***',
  storageBucket: '***',
  messagingSenderId: '***'
});

const database = firebase.database();

export default database;
