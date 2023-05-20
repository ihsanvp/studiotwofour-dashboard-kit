import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { memoize } from "lodash"
import { PUBLIC_API_KEY, PUBLIC_APP_ID, PUBLIC_AUTH_DOMAIN, PUBLIC_MESSAGING_SENDER_ID, PUBLIC_PROJECT_ID, PUBLIC_STORAGE_BUCKET } from "$env/static/public"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: PUBLIC_API_KEY,
    authDomain: PUBLIC_AUTH_DOMAIN,
    projectId: PUBLIC_PROJECT_ID,
    storageBucket: PUBLIC_STORAGE_BUCKET,
    messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
    appId: PUBLIC_APP_ID
};

export const initFirebase = memoize(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    return {
        auth
    }
})