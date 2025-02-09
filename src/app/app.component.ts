import {
    Component,
    inject,
    Injector,
    runInInjectionContext,
} from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import {
    Auth,
    authState,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "@angular/fire/auth";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, CommonModule, MatButtonModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    title = "knowledge-graph-app";
    auth: Auth = inject(Auth);
    private router: Router = inject(Router);
    authState$ = authState(this.auth);
    private injector = inject(Injector);

    constructor() {
        console.log("AppComponent: Constructor called");
    }

    async signOut() {
        console.log("AppComponent: signOutWithGoogle() called");
        runInInjectionContext(this.injector, async () => {
            try {
                await signOut(this.auth);
                this.router.navigate(["/"]);
                console.log("AppComponent: Sign-out successful");
            } catch (error) {
                console.error("AppComponent: Sign-out error:", error);
            }
        });
    }
}
