import { Injectable, inject } from "@angular/core";
import {
    Auth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
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

    registerUserWithEmailPassword(
        email: string,
        password: string
    ): Observable<any> {
        return from(createUserWithEmailAndPassword(this.auth, email, password));
    }
}
