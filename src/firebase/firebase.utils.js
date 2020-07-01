import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAqb6ld-8prAV0LwUxB8JkAYodn9Nvoq0g",
    authDomain: "crwn-db-830e9.firebaseapp.com",
    databaseURL: "https://crwn-db-830e9.firebaseio.com",
    projectId: "crwn-db-830e9",
    storageBucket: "crwn-db-830e9.appspot.com",
    messagingSenderId: "694931591474",
    appId: "1:694931591474:web:5eb898527e771bdd64472b",
    measurementId: "G-5XMS69WSNB"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      
      if (!snapShot.exists) {
          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
          } catch (error) {
            console.log('error creating user' + error.message);
          }
      }

      return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  const fbProvider = new firebase.auth.FacebookAuthProvider();
  fbProvider.setCustomParameters({'display': 'popup'});
  export const signInWithFacebook = () => auth.signInWithPopup(fbProvider);

  export default firebase;