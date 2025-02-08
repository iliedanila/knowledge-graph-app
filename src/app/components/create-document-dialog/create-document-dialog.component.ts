import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Injector,
    Output,
    OnInit,
    runInInjectionContext,
    Inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DocumentService } from "../../services/document.service";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Document } from "../../models/document.model";

export interface CreateDocumentDialogData {
    documentData: Document;
}

@Component({
    selector: "app-create-document-dialog",
    imports: [
        FormsModule,
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: "./create-document-dialog.component.html",
    styleUrls: ["./create-document-dialog.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDocumentDialogComponent implements OnInit {
    @Output() dialogClosed = new EventEmitter<void>();
    private injector = inject(Injector);
    private documentService = inject(DocumentService);
    public dialogRef = inject(MatDialogRef<CreateDocumentDialogComponent>);

    documentTitle = "";
    documentContent = "";
    isEditMode = false;
    private documentId: string | null = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: CreateDocumentDialogData
    ) {
        console.log(
            "CreateDocumentDialogComponent: Constructor called, data:",
            data
        );
        if (data && data.documentData) {
            this.isEditMode = true;
            this.documentTitle = data.documentData.title;
            this.documentContent = data.documentData.content;
            this.documentId = data.documentData.id;
            console.log(
                "CreateDocumentDialogComponent: Running in EDIT mode, document data:",
                data.documentData
            );
        } else {
            console.log(
                "CreateDocumentDialogComponent: Running in CREATE mode"
            );
        }
    }

    ngOnInit(): void {
        console.log(
            "CreateDocumentDialogComponent: ngOnInit called, isEditMode:",
            this.isEditMode
        );
    }

    closeDialog() {
        console.log(
            "CreateDocumentDialogComponent: Close button clicked, emitting dialogClosed event"
        );
        this.dialogClosed.emit();
    }

    onCloseButtonClicked() {
        this.closeDialog();
    }

    async onCreateDocument() {
        console.log("CreateDocumentDialogComponent: Create button clicked");
        console.log("Title:", this.documentTitle);
        console.log("Content:", this.documentContent);

        runInInjectionContext(this.injector, async () => {
            try {
                await this.documentService.createDocument(
                    this.documentTitle,
                    this.documentContent
                );
                console.log(
                    "CreateDocumentDialogComponent: Document created successfully"
                );

                this.documentTitle = "";
                this.documentContent = "";
                console.log(
                    "CreateDocumentDialogComponent: Form fields cleared"
                );

                this.dialogRef.close();
            } catch (error) {
                console.error(
                    "CreateDocumentDialogComponent: Error creating document:",
                    error
                );
                // Error handling (improve later)
            }
        });
    }

    async onSaveChangesDocument() {
        console.log(
            "CreateDocumentDialogComponent: Save Changes button clicked (EDIT MODE)"
        );
        console.log("Title:", this.documentTitle);
        console.log("Content:", this.documentContent);

        runInInjectionContext(this.injector, async () => {
            try {
                if (this.documentId) {
                    await this.documentService.updateDocument(
                        this.documentId,
                        this.documentTitle,
                        this.documentContent
                    );
                    console.log(
                        `CreateDocumentDialogComponent: Document with ID ${this.documentId} updated successfully`
                    );

                    this.documentTitle = "";
                    this.documentContent = "";
                    console.log(
                        "CreateDocumentDialogComponent: Form fields cleared"
                    );

                    this.dialogRef.close();
                } else {
                    console.error(
                        "CreateDocumentDialogComponent: Error: documentId is missing in EDIT mode. Cannot update."
                    );
                }
            } catch (error) {
                console.error(
                    "CreateDocumentDialogComponent: Error updating document:",
                    error
                );
            }
        });
    }
}
