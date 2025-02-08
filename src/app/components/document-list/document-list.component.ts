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

@Component({
    selector: "app-document-list",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./document-list.component.html",
    styles: ``,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentListComponent implements OnInit {
    private documentService = inject(DocumentService);
    private injector = inject(Injector);
    documents$!: Observable<Document[]>;

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
    }
}
