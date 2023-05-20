import { SESSION_COOKIE_NAME } from '$lib/constants';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
    return new Response('', {
        headers: {
            'set-cookie': cookies.serialize(SESSION_COOKIE_NAME, '', {
                path: '/',
                httpOnly: true,
                maxAge: -1,
            })
        }
    });
}
