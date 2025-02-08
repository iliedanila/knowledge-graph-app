import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Document } from "../models/document.model";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";

@Injectable({
    providedIn: "root",
})
export class DocumentService {
    private firestore: Firestore = inject(Firestore);

    constructor() {
        console.log("DocumentService: Constructor called (Firestore Data)");
    }

    getDocuments(): Observable<Document[]> {
        console.log("DocumentService: getDocuments() called (Firestore Data)");
        const documentsCollection = collection(this.firestore, "documents");
        return collectionData(documentsCollection, {
            idField: "id",
        }) as Observable<Document[]>;
    }
}
