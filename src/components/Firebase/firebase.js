// import app from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyB4-rCX9K_CPr4gILLhA5WGBI3MCi_PhJM",
    authDomain: "dash-294715.firebaseapp.com",
    databaseURL: "https://dash-294715.firebaseio.com",
    projectId: "dash-294715",
    storageBucket: "dash-294715.appspot.com",
    messagingSenderId: "156378232596",
    appId: "1:156378232596:web:3fe236942e371d2e77f401",
    measurementId: "G-K44HSGEE5D"
};

class Firebase {
    constructor() {
        firebase.default.initializeApp(config);

        this.auth = firebase.default.auth();
        this.db = firebase.default.firestore();
        this.googleProvider = new firebase.default.auth.GoogleAuthProvider();
        this.githubProvider = new firebase.default.auth.GithubAuthProvider();
        this.githubProvider.addScope('repo');
        this.facebookProvider = new firebase.default.auth.FacebookAuthProvider();
    }
    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => {
        this.auth.signOut();
        window.location.reload(true);
    }

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
    signInWithGitHub = () => this.auth.signInWithPopup(this.githubProvider);
    signInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

}



export default Firebase;
