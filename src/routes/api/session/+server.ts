import { json } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/constants';
import { verifyToken } from '~/lib/server/firebase';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const data = await request.json()

    if (!data.token) {
        return json({
            state: "error",
            message: "missing token"
        }, { status: 400 })
    }

    const isValid = await verifyToken(data.token)

    if (!isValid) {
        return json({
            state: "error",
            message: "invalid token"
        }, { status: 400 })
    }

    cookies.set(SESSION_COOKIE_NAME, data.token, {
        httpOnly: true,
        secure: true,
        path: "/"
    })

    return json({
        state: "success"
    })
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ cookies }) {
    return json({
        state: "success"
    }, {
        headers: {
            'set-cookie': cookies.serialize(SESSION_COOKIE_NAME, '', {
                path: '/',
                httpOnly: true,
                maxAge: -1,
            })
        }
    });
}