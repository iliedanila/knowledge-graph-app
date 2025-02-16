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
import { map, Observable } from "rxjs";
import { Document } from "../../models/document.model";
import { CreateDocumentDialogComponent } from "../create-document-dialog/create-document-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
} from "@angular/material/card";

@Component({
    selector: "app-document-list",
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatCardActions,
    ],
    templateUrl: "./document-list.component.html",
    styleUrl: "./document-list.component.css",
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
            this.documents$ = this.documentService.getUserDocuments().pipe(
                map((documents) =>
                    documents.map((doc) => ({
                        ...doc,
                        createdAt: doc.createdAt?.seconds
                            ? new Date(doc.createdAt.seconds * 1000)
                            : null, // Convert Firestore Timestamp to JavaScript Date
                    }))
                )
            );
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
