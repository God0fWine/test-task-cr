import firebaseconfig from './firebaseIndex'
import firebase from 'firebase'

//Методы для аутентификации и регистрации пользователя
export const authMethods = {
    //Регистрация
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
    //Аутентификация
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
    //Будущий выход с аккаунта
    signout: (email, password) => {

    },
}