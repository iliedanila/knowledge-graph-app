import { Injectable, inject } from "@angular/core";
import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "@angular/fire/auth"; // Make sure these are imported
import { Observable, from } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    auth: Auth = inject(Auth);
    constructor() {}

    loginWithEmailPassword(email: string, password: string): Observable<any> {
        console.log(
            "AuthService: loginWithEmailPassword called",
            email,
            password
        );
        return from(signInWithEmailAndPassword(this.auth, email, password));
    }

    signInWithGoogle(): Observable<any> {
        const provider = new GoogleAuthProvider();
        return from(signInWithPopup(this.auth, provider));
    }

    registerUserWithEmailPassword(
        email: string,
        password: string
    ): Observable<any> {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }
}
