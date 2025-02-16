import {
    inject,
    Injectable,
    Injector,
    runInInjectionContext,
} from "@angular/core";
import {
    combineLatest,
    EMPTY,
    from,
    map,
    Observable,
    switchMap,
    throwError,
} from "rxjs";
import { Document } from "../models/document.model";
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    Firestore,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from "@angular/fire/firestore";
import { Auth, authState } from "@angular/fire/auth";

@Injectable({
    providedIn: "root",
})
export class DocumentService {
    constructor(
        private firestore: Firestore,
        private auth: Auth,
        private injector: Injector
    ) {}

    getUserDocuments(): Observable<any[]> {
        return authState(this.auth).pipe(
            switchMap((user) => {
                if (!user) return EMPTY;

                return runInInjectionContext(this.injector, () => {
                    const documentsCollection = collection(
                        this.firestore,
                        "documents"
                    );

                    // Query for documents where the user is the owner
                    const ownerQuery = query(
                        documentsCollection,
                        where("owner", "==", user.uid)
                    );
                    const ownerDocs$ = collectionData(ownerQuery, {
                        idField: "id",
                    });

                    // Query for documents where the user is in the sharedWith array
                    const sharedQuery = query(
                        documentsCollection,
                        where("sharedWith", "array-contains", user.uid)
                    );
                    const sharedDocs$ = collectionData(sharedQuery, {
                        idField: "id",
                    });

                    // Combine both observables
                    return combineLatest([ownerDocs$, sharedDocs$]).pipe(
                        map(([ownerDocs, sharedDocs]) => [
                            ...ownerDocs,
                            ...sharedDocs,
                        ])
                    );
                });
            })
        );
    }

    createDocument(
        documentData: Omit<Document, "id" | "owner">
    ): Observable<any> {
        const user = this.auth.currentUser;

        if (!user) {
            return throwError(() => new Error("User not logged in"));
        }

        const documentsCollection = collection(this.firestore, "documents");
        const documentToCreate: Omit<Document, "id"> = {
            ...documentData,
            owner: user.uid,
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
