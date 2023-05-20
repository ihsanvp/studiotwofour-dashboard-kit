import type { Handle } from "@sveltejs/kit"
import { UNPROTECTED_ROUTES } from "../constants"

export function redirect(location: string) {
    return new Response(null, {
        status: 303,
        headers: { location }
    })
}

export async function gaurdRoute(ctx: Parameters<Handle>[0]) {
    const isProtected = !UNPROTECTED_ROUTES.includes(ctx.event.url.pathname)

    if (isProtected) {
        return redirect("/login")
    } else {
        return await ctx.resolve(ctx.event)
    }
}