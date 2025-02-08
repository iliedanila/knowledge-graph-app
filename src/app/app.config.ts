import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideFirebaseApp(() =>
            initializeApp({
                projectId: "knowledgegraph-72939",
                appId: "1:51304440744:web:7859f2b285bb33afd0339d",
                storageBucket: "knowledgegraph-72939.firebasestorage.app",
                apiKey: "AIzaSyDucPTxS82x-rnChqCnfVAlG-RcBK0sXEE",
                authDomain: "knowledgegraph-72939.firebaseapp.com",
                messagingSenderId: "51304440744",
            })
        ),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()), provideAnimationsAsync(),
    ],
};
