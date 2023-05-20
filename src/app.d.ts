// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		import type { User } from "./models/auth.models";
		// interface Error {}
		interface Locals {
			user: User
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
