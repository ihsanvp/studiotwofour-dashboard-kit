import { SESSION_COOKIE_NAME } from '$lib/constants';
import { decodeToken } from '~/lib/server/firebase';
import { gaurdRoute } from '~/lib/server/http';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle(context) {
    const token = context.event.cookies.get(SESSION_COOKIE_NAME)

    if (token) {
        const decoded = await decodeToken(token)
        if (decoded) {
            context.event.locals.user = {
                id: decoded.uid,
                email: decoded.email || "",
            }
        } else {
            return await gaurdRoute(context)
        }
    } else {
        return await gaurdRoute(context)
    }

    return await context.resolve(context.event)
}