import { error, json } from '@sveltejs/kit'
import jwt from "jsonwebtoken"
import { AUTH_REGISTER_SECRET } from '~/lib/constants.js'
import nodemailer from "nodemailer"
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "$env/static/private"
import { render } from "svelte-email"
import Invite from '~/components/emails/Invite.svelte'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
    const data = await request.json()

    if (!data.emails && !Array.isArray(data.emails)) {
        throw error(400, "missing emails")
    }

    // console.log(SMTP_USER, SMTP_PASSWORD)

    const emails: string[] = data.emails
    // const transport = nodemailer.createTransport({
    //     host: SMTP_HOST,
    //     port: parseInt(SMTP_PORT),
    //     secure: true,
    //     auth: {
    //         user: SMTP_USER,
    //         pass: SMTP_PASSWORD
    //     },
    // })

    const links: string[] = []

    for (const email of emails) {
        const token = jwt.sign({
            email,
        }, AUTH_REGISTER_SECRET, {
            expiresIn: "7d"
        })

        const link = url.origin + "/invite/" + token
        const html = await render({
            template: Invite,
            props: {
                url: link
            }
        })

        links.push(link)

        // await transport.sendMail({
        //     from: 'info@studiotwofour.com',
        //     to: email,
        //     subject: 'Member Invitation',
        //     html
        // })
    }

    return json({
        state: "success",
        links
    })
}