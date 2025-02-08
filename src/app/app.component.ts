import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DocumentListComponent } from "./components/document-list/document-list.component";
import { Auth, authState } from "@angular/fire/auth";
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

    constructor() {}
}
