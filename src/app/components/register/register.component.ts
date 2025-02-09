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
} from "@angular/forms"; // Import ReactiveFormsModule, FormControl, FormGroup, Validators
import { AuthService } from "../../services/auth.service"; // Import AuthService
import { Router } from "@angular/router"; // Import Router

@Component({
    selector: "app-register",
    imports: [
        CommonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: "./register.component.html",
    styleUrl: "./register.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
    emailFormControl = new FormControl("", [
        Validators.required,
        Validators.email,
    ]);
    passwordFormControl = new FormControl("", [Validators.required]);
    registerForm = new FormGroup({
        email: this.emailFormControl,
        password: this.passwordFormControl,
    });
    private authService = inject(AuthService);
    private router = inject(Router);
    private injector = inject(Injector);

    constructor() {}

    ngOnInit(): void {}

    register() {
        console.log("RegisterComponent: Register button clicked!");
        if (this.registerForm.valid) {
            const email = this.registerForm.value.email as string;
            const password = this.registerForm.value.password as string;

            runInInjectionContext(this.injector, () => {
                this.authService
                    .registerUserWithEmailPassword(email, password)
                    .subscribe({
                        next: (_userCredential) => {
                            alert(
                                "Registration successful! Please log in with your new credentials."
                            );
                            this.router.navigate(["/login"]);
                        },
                        error: (error) => {
                            alert("Registration failed. Please try again.");
                        },
                    });
            });
        } else {
            console.log(
                "RegisterComponent: Form is invalid. Please check fields."
            );
            alert("Please fill in all required fields correctly.");
        }
    }
}
