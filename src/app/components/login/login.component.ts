import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    OnInit,
    inject,
    runInInjectionContext,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Auth, GoogleAuthProvider, signInWithPopup } from "@angular/fire/auth";

@Component({
    selector: "app-login",
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    private injector = inject(Injector);

    emailFormControl = new FormControl("", [
        Validators.required,
        Validators.email,
    ]);
    passwordFormControl = new FormControl("", [Validators.required]);
    loginForm = new FormGroup({
        // FormGroup to group form controls
        email: this.emailFormControl,
        password: this.passwordFormControl,
    });
    private authService = inject(AuthService);
    auth: Auth = inject(Auth);
    private router = inject(Router);

    constructor() {}

    ngOnInit(): void {}

    login() {
        console.log("LoginComponent: Login button clicked!");
        if (this.loginForm.valid) {
            const email = this.loginForm.value.email as string;
            const password = this.loginForm.value.password as string;

            runInInjectionContext(this.injector, () => {
                this.authService
                    .loginWithEmailPassword(email, password)
                    .subscribe({
                        next: (user) => {
                            console.log("Login successful!", user);
                            this.router.navigate(["/documents"]);
                        },
                        error: (error) => {
                            console.error("Login failed:", error);
                            alert(
                                "Login failed. Please check your email and password."
                            );
                        },
                    });
            });
        } else {
            console.log(
                "LoginComponent: Form is invalid. Please check fields."
            );
            alert("Please fill in all required fields correctly.");
        }
    }

    async signInWithGoogle() {
        console.log("AppComponent: signInWithGoogle() called");
        runInInjectionContext(this.injector, async () => {
            this.authService.signInWithGoogle().subscribe({
                next: (user) => {
                    console.log("Login successful!", user);
                    this.router.navigate(["/documents"]);
                },
                error: (error) => {
                    console.error("Login failed:", error);
                    alert(
                        "Login failed. Please check your email and password."
                    );
                },
            });
        });
    }

    navigateToRegister() {
        console.log("LoginComponent: Navigate to Register button clicked");
        this.router.navigate(["/register"]);
    }
}
