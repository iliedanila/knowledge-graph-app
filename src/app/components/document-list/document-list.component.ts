import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Injector,
    OnInit,
    runInInjectionContext,
} from "@angular/core";
import { DocumentService } from "../../services/document.service";
import { Observable } from "rxjs";
import { Document } from "../../models/document.model";
import { CreateDocumentDialogComponent } from "../create-document-dialog/create-document-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";

@Component({
    selector: "app-document-list",
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatDialogModule],
    templateUrl: "./document-list.component.html",
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
    documents$!: Observable<Document[]>;

    constructor(
        private documentService: DocumentService,
        private injector: Injector,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        runInInjectionContext(this.injector, () => {
            this.documents$ = this.documentService.getUserDocuments();
        });
    }

    trackByDocumentId(index: number, document: Document): string {
        return document.id;
    }

    createDocument() {
        const dialogRef = this.dialog.open(CreateDocumentDialogComponent, {
            width: "400px",
        });

        dialogRef.afterClosed().subscribe((_result) => {});
    }

    editDocument(document: Document) {
        const dialogRef = this.dialog.open(CreateDocumentDialogComponent, {
            width: "400px",
            data: { documentData: document },
        });

        dialogRef.afterClosed().subscribe((_result) => {});
    }

    deleteDocument(document: Document) {
        const documentId = document.id;
        if (documentId) {
            runInInjectionContext(this.injector, async () => {
                try {
                    await this.documentService.deleteDocument(documentId);
                } catch (error) {
                    console.error(
                        `Error deleting document with ID ${documentId}:`,
                        error
                    );
                }
            });
        }
    }
}
