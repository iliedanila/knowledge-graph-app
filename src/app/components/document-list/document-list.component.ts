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

@Component({
    selector: "app-document-list",
    standalone: true,
    imports: [CommonModule, CreateDocumentDialogComponent],
    templateUrl: "./document-list.component.html",
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
    private documentService = inject(DocumentService);
    private injector = inject(Injector);
    documents$!: Observable<Document[]>;
    isCreateDialogVisible = false;

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
        this.isCreateDialogVisible = true; // <-- Set isCreateDialogVisible to true when button is clicked
        console.log(
            "DocumentListComponent: isCreateDialogVisible set to:",
            this.isCreateDialogVisible
        );
    }

    onDialogClose() {
        console.log(
            "DocumentListComponent: dialogClosed event received, closing dialog"
        );
        this.isCreateDialogVisible = false;
        console.log(
            "DocumentListComponent: isCreateDialogVisible set to:",
            this.isCreateDialogVisible
        );
    }

    editDocument(document: Document) {
        console.log(
            "DocumentListComponent: editDocument() button clicked for document:",
            document
        );
    }
}
