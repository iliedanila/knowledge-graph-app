import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "../login/login.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-welcome",
    imports: [CommonModule, LoginComponent, MatCardModule, MatButtonModule],
    templateUrl: "./welcome.component.html",
    styleUrl: "./welcome.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
