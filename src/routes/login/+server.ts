import { error } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/constants';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const { token } = await request.json()

    cookies.set(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: true,
        path: "/"
    })

    // throw error(400)

    return new Response()
}
