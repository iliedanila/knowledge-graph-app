import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Document } from "../models/document.model";
import {
    addDoc,
    collection,
    collectionData,
    doc,
    Firestore,
    setDoc,
    updateDoc,
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

    async createDocument(title: string, content: string) {
        const documentsCollection = collection(this.firestore, "documents");
        const docRef = doc(documentsCollection); // Let Firestore auto-generate ID
        const document: Document = {
            id: docRef.id, // Get the auto-generated ID
            title: title,
            content: content,
            createdAt: new Date(), // Add createdAt timestamp
        };
        try {
            await setDoc(docRef, document);
            console.log(
                "DocumentService: Document created successfully with ID:",
                document.id
            );
            return document.id; // Return the document ID
        } catch (error) {
            console.error("DocumentService: Error creating document:", error);
            throw error; // Re-throw the error for component to handle
        }
    }

    async updateDocument(
        documentId: string,
        title: string,
        content: string
    ): Promise<void> {
        try {
            const documentRef = doc(this.firestore, "documents", documentId);
            await updateDoc(documentRef, {
                title: title,
                content: content,
            });
            console.log(
                `DocumentService: Document with ID ${documentId} updated successfully`
            );
        } catch (error) {
            console.error(
                `DocumentService: Error updating document with ID ${documentId}:`,
                error
            );
            throw error;
        }
    }
}
