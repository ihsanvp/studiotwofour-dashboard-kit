import { error } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { AUTH_REGISTER_SECRET } from '~/lib/constants.js';

interface Payload {
    email: string
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    try {
        const payload = jwt.verify(params.token, AUTH_REGISTER_SECRET) as Payload

        if (!payload) {
            throw error(404)
        }

        return {
            email: payload.email
        }

    } catch (err) {
        console.log(err)
        throw error(404)
    }


}