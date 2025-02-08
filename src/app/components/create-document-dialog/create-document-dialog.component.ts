import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
} from "@angular/core";

@Component({
    selector: "app-create-document-dialog",
    imports: [],
    templateUrl: "./create-document-dialog.component.html",
    styleUrls: ["./create-document-dialog.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDocumentDialogComponent {
    @Output() dialogClosed = new EventEmitter<void>();

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
}
