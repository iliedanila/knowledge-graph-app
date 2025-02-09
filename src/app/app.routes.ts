import { Routes } from "@angular/router";
import { DocumentListComponent } from "./components/document-list/document-list.component"; // Import DocumentListComponent
import { LoginComponent } from "./components/login/login.component"; // Import LoginComponent
import { RegisterComponent } from "./components/register/register.component";

export const routes: Routes = [
    {
        path: "documents",
        component: DocumentListComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "",
        redirectTo: "documents",
        pathMatch: "full",
    },
    {
        path: "**",
        redirectTo: "documents",
    },
];
