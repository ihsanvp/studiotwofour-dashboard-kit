/** @type {import('./$types').LayoutServerLoad} */
export async function load(event) {
    const user = event.locals.user
    return {
        user
    }
}