import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    inject,
    Injector,
    Output,
    runInInjectionContext,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DocumentService } from "../../services/document.service";

@Component({
    selector: "app-create-document-dialog",
    imports: [FormsModule, CommonModule],
    templateUrl: "./create-document-dialog.component.html",
    styleUrls: ["./create-document-dialog.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDocumentDialogComponent {
    @Output() dialogClosed = new EventEmitter<void>();
    private injector = inject(Injector);
    private documentService = inject(DocumentService);

    documentTitle = "";
    documentContent = "";

    constructor() {}

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
                    "CreateDocumentDialogComponent: Document creation initiated successfully"
                );
                this.dialogClosed.emit(); // Close dialog after successful creation
            } catch (error) {
                console.error(
                    "CreateDocumentDialogComponent: Error creating document:",
                    error
                );
            }
        });
    }
}
