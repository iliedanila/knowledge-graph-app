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
    private documentService = inject(DocumentService);
    private injector = inject(Injector);
    documents$!: Observable<Document[]>;
    private dialog: MatDialog = inject(MatDialog);

    constructor() {
        console.log("DocumentListComponent: Constructor called");
    }

    ngOnInit(): void {
        console.log("DocumentListComponent: ngOnInit called");
        runInInjectionContext(this.injector, () => {
            console.log("DocumentListComponent: Inside runInInjectionContext");
            this.documents$ = this.documentService.getDocuments();
            console.log(
                "DocumentListComponent: getDocuments() called inside runInInjectionContext, documents$ Observable:",
                this.documents$
            );
        });
    }

    trackByDocumentId(index: number, document: Document): string {
        return document.id;
    }

    createDocument() {
        console.log("DocumentListComponent: createDocument() button clicked!");
        console.log(
            "DocumentListComponent: Opening CreateDocumentDialog using MatDialog"
        );
        const dialogRef = this.dialog.open(CreateDocumentDialogComponent, {
            width: "400px",
        });

        dialogRef.afterClosed().subscribe((result) => {
            console.log("The dialog was closed"); // You can add logic here to handle dialog close event if needed
        });
    }

    editDocument(document: Document) {
        console.log(
            "DocumentListComponent: editDocument() button clicked for document:",
            document
        );
    }
}
