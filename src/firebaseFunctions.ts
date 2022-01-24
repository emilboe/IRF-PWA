import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { config } from './firebaseConfig'

firebase.initializeApp(config)

const auth = firebase.auth();

export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(function (user) {
            if (user) resolve(user)
            else resolve(null)
            unsubscribe()
        })
    })
}

export async function loginUser(username: string, password: string) {

    const email = `${username}@gmail.com`
    // console.log('logging in with: ', email, password)
    //authenticate
    try {
        const res = await auth.signInWithEmailAndPassword(email, password)
        // console.log(res);
        return res
    } catch (error) {
        // console.log('login error: ', error);
        return error
    }

}

export function logoutUser() {
    console.log('logging out')
    return auth.signOut()
}

export async function registerUser(email: string, password: string) {

    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        console.log(res)
        const response = {
            success: true,
            message: res
        }
        return response

    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        // we'll proceed, but let's report it
        const response = {
            success: false,
            message: message
        }
        return response
    }
}