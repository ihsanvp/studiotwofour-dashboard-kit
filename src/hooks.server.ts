import { json, type Handle } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import { SESSION_COOKIE_NAME, UNPROTECTED_ROUTES } from "./lib/constants"
import { decodeToken } from "./lib/server/firebase"

const apiAuthorization: Handle = async ({ event, resolve }) => {
    const next = () => resolve(event)
    const error = () => json({
        state: "error",
        message: "Unauthorized"
    }, {
        status: 401
    })

    if (event.url.pathname.startsWith("/api") && !UNPROTECTED_ROUTES.includes(event.url.pathname)) {
        const token = event.cookies.get(SESSION_COOKIE_NAME)

        if (token) {
            const decoded = await decodeToken(token)

            if (decoded) {
                event.locals.user = {
                    id: decoded.uid,
                    email: decoded.email || "",
                }

                return next()
            }
        }

        return error()

    }

    return next()
}

export const handle = sequence(apiAuthorization)