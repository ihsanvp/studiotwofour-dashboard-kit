import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { derived } from "svelte/store";
import type { User } from "~/types/authTypes";
import { page } from "$app/stores"
import { invalidateAll } from "$app/navigation";

export type AuthState = User | null

export const auth = derived<typeof page, AuthState>(
    page,
    ($page, set) => {
        const { user } = $page.data
        if (!user) {
            set(null)
            return
        }
        set(user)
    },
    null
)

export const AuthActions = {
    // Register
    async register(email: string, password: string) {
        const firebaseAuth = getAuth()
        await createUserWithEmailAndPassword(firebaseAuth, email, password)
    },

    // Login
    async login(email: string, password: string) {
        const firebaseAuth = getAuth()
        const credentials = await signInWithEmailAndPassword(firebaseAuth, email, password)
        const token = await credentials.user.getIdToken();
        await fetch(window.location.href, {
            method: 'POST',
            body: JSON.stringify({
                token
            })
        });
        await invalidateAll();
    },

    // Logout
    async logout() {
        const firebaseAuth = getAuth();
        await signOut(firebaseAuth);
        await fetch('/logout', { method: 'POST' });
        await invalidateAll();
    },
}