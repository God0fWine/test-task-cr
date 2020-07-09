import firebaseconfig from './firebaseIndex'
import firebase from 'firebase'


export const authMethods = {
    signup: async (email, password) => {
        let res = await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                return firebase.auth().currentUser;
            })
            .catch(err => {
                return err;
            })
        return res;
    },
    signin: async (email, password) => {
        let res = await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                return firebase.auth().currentUser;
            })
            .catch(err => {
                // console.log(err)
                return err;
            })
        return res;
    },
    signout: (email, password) => {

    },
}