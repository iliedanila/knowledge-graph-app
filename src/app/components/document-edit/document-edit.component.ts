import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentService } from "../../services/document.service";
import {
    MatFormField,
    MatFormFieldModule,
    MatLabel,
} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: "app-document-edit",
    imports: [
        MatFormField,
        MatLabel,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: "./document-edit.component.html",
    styleUrl: "./document-edit.component.css",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentEditComponent implements OnInit {
    documentId: string | null = null;
    documentForm: FormGroup;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private documentService: DocumentService,
        private formBuilder: FormBuilder
    ) {
        this.documentForm = this.formBuilder.group({
            title: [""],
            content: [""],
        });
    }

    ngOnInit(): void {
        this.documentId = this.route.snapshot.paramMap.get("id");
        if (this.documentId) {
            this.documentService
                .getDocumentById(this.documentId)
                .subscribe((doc) => {
                    if (doc) {
                        this.documentForm.patchValue({
                            title: doc.title || "",
                            content: doc.content || "",
                        });
                    }
                    this.loading = false;
                });
        } else {
            this.loading = false;
        }
    }

    saveDocument(): void {
        if (this.documentId) {
            this.documentService
                .updateDocument(
                    this.documentId,
                    this.documentForm.value.title,
                    this.documentForm.value.content
                )
                .then(() => {
                    this.router.navigate(["/"]); // Redirect to document list after saving
                });
        }
    }

    cancelEdit(): void {
        this.router.navigate(["/"]);
    }
}
