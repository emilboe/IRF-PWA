import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { config } from './firebaseConfig'
import { toast } from './toast'

firebase.initializeApp(config)

const auth = firebase.auth();

export async function loginUser(username: string, password: string) {

    const email = `${username}@gmail.com`

    //authenticate
    try {
        const res = await auth.signInWithEmailAndPassword(email, password)
        console.log(res);
        return true
    } catch (error) {
        console.log(error);
        return false
    }

}

export async function registerUser(username: string, password: string) {

    const email = `${username}@gmail.com`
    var response: object = {}

    try {
        const res = await auth.createUserWithEmailAndPassword(email, password)
        console.log(res)
        return response = {
            success: true,
            message: res
        }
    } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)
        // we'll proceed, but let's report it
        return response = {
            success: false,
            message
        }
    }
}