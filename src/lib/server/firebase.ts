import { FIREBASE_ADMIN_SDK_KEY } from '$env/static/private';
import admin from 'firebase-admin';
import type { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const initializeFirebaseAdmin = () => {
    if (!admin.apps.length) {
        const serviceAccount = JSON.parse(FIREBASE_ADMIN_SDK_KEY);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
};

export function getFirebaseAdmin() {
    initializeFirebaseAdmin()
    return admin
}

export async function verifyToken(token: string) {
    if (!token) {
        return null;
    }

    try {
        // console.log(token)
        initializeFirebaseAdmin();
        await admin.auth().verifyIdToken(token);
        return true
    } catch (err) {
        console.error('decode:error =>', err);
        return false;
    }
}

export async function decodeToken(token: string): Promise<DecodedIdToken | null> {
    if (!token) {
        return null;
    }

    try {
        // console.log(token)
        initializeFirebaseAdmin();
        return await admin.auth().verifyIdToken(token);
    } catch (err) {
        console.error('decode:error =>', (err as Error).name);
        return null;
    }
}