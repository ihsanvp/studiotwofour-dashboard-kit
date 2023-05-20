import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { derived, writable } from "svelte/store";
import type { User } from "~/models/auth.models";

export interface AuthState {
    isLoading: boolean
    user: null | User
}

/** --------- State ----------- */
export const auth = writable<AuthState>({
    isLoading: true,
    user: null
})

export const isLoggedIn = derived(auth, $auth => !$auth.isLoading && !!$auth.user)


/** ---------- Actions ---------- */
export async function signup(email: string, password: string) {
    const firebaseAuth = getAuth()
    await createUserWithEmailAndPassword(firebaseAuth, email, password)
}


export async function login(email: string, password: string) {
    const firebaseAuth = getAuth()
    await signInWithEmailAndPassword(firebaseAuth, email, password)
}

export async function logout() {
    const firebaseAuth = getAuth()
    await signOut(firebaseAuth)
}