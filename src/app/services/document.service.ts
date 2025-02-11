import { inject, Injectable } from "@angular/core";
import { from, Observable, switchMap, throwError } from "rxjs";
import { Document } from "../models/document.model";
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    Firestore,
    setDoc,
    updateDoc,
} from "@angular/fire/firestore";
import { Auth, authState } from "@angular/fire/auth";

@Injectable({
    providedIn: "root",
})
export class DocumentService {
    private firestore: Firestore = inject(Firestore);
    private auth: Auth = inject(Auth);

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

    createDocument(
        documentData: Omit<Document, "id" | "userId">
    ): Observable<any> {
        const user = this.auth.currentUser;

        if (!user) {
            return throwError(() => new Error("User not logged in"));
        }

        const documentsCollection = collection(this.firestore, "documents");
        const documentToCreate = {
            ...documentData,
            userId: user.uid,
        };

        return from(addDoc(documentsCollection, documentToCreate));
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

    async deleteDocument(documentId: string): Promise<void> {
        try {
            const documentRef = doc(this.firestore, "documents", documentId);
            await deleteDoc(documentRef);
            console.log(
                `DocumentService: Document with ID ${documentId} deleted successfully`
            );
        } catch (error) {
            console.error(
                `DocumentService: Error deleting document with ID ${documentId}:`,
                error
            );
            throw error;
        }
    }
}
