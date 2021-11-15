// import app from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
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
