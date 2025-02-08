import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Document } from "../models/document.model";
import {
    addDoc,
    collection,
    collectionData,
    Firestore,
} from "@angular/fire/firestore";

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

    async createDocument(title: string, content: string): Promise<any> {
        console.log(
            "DocumentService: createDocument() called (Firestore Data)"
        );
        try {
            const documentsCollection = collection(this.firestore, "documents");
            const newDocumentRef = await addDoc(documentsCollection, {
                // Use addDoc to add a new document
                title: title,
                content: content,
                createdAt: new Date(), // Add timestamp
            });
            console.log(
                "DocumentService: Document created successfully with ID:",
                newDocumentRef.id
            );
            return newDocumentRef;
        } catch (error) {
            console.error("DocumentService: Error creating document:", error);
            throw error;
        }
    }
}
