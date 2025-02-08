import {
    Component,
    inject,
    Injector,
    runInInjectionContext,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DocumentListComponent } from "./components/document-list/document-list.component";
import {
    Auth,
    authState,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "@angular/fire/auth";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-root",
    imports: [RouterOutlet, DocumentListComponent, CommonModule],
    templateUrl: "./app.component.html",
    styleUrl: "./app.component.css",
})
export class AppComponent {
    title = "knowledge-graph-app";
    auth: Auth = inject(Auth);
    authState$ = authState(this.auth);
    private injector = inject(Injector);

    constructor() {
        console.log("AppComponent: Constructor called");
    }

    async signInWithGoogle() {
        console.log("AppComponent: signInWithGoogle() called");
        runInInjectionContext(this.injector, async () => {
            // Wrap signInWithPopup in runInInjectionContext
            console.log(
                "AppComponent: signInWithGoogle() - Inside runInInjectionContext"
            );
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(this.auth, provider);
                console.log("AppComponent: Google Sign-in successful");
            } catch (error) {
                console.error("AppComponent: Google Sign-in error:", error);
            }
        });
    }

    async signOutWithGoogle() {
        console.log("AppComponent: signOutWithGoogle() called");
        runInInjectionContext(this.injector, async () => {
            // Wrap signOut in runInInjectionContext
            console.log(
                "AppComponent: signOutWithGoogle() - Inside runInInjectionContext"
            );
            try {
                await signOut(this.auth);
                console.log("AppComponent: Sign-out successful");
            } catch (error) {
                console.error("AppComponent: Sign-out error:", error);
            }
        });
    }
}
