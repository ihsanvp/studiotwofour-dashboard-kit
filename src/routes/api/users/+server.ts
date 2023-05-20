import { json } from '@sveltejs/kit'
import { getFirebaseAdmin } from '~/lib/server/firebase.js'

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    const admin = getFirebaseAdmin()
    const users = await admin.auth().listUsers()
    const result = users.users.filter(user => user.uid != locals.user.id).map(user => ({
        id: user.uid,
        email: user.email,
        verified: user.emailVerified,
    }))

    return json(result)
}