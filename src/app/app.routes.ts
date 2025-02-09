import { Routes } from "@angular/router";
import { DocumentListComponent } from "./components/document-list/document-list.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { WelcomeComponent } from "./components/welcome/welcome.component"; // Make sure WelcomeComponent is imported

export const routes: Routes = [
    {
        path: "",
        component: WelcomeComponent,
    },
    {
        path: "documents",
        component: DocumentListComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "**",
        redirectTo: "",
    },
];
