import { uniqueId } from "lodash";
import { derived, writable } from "svelte/store";

interface Field {
    id: string
    value: string,
    errors: string[]
}

export const isOpen = writable(false)
export const fields = writable<Field[]>([
    {
        id: uniqueId(),
        value: "",
        errors: ["Invalid email address"]
    }
])
export const isValidFields = derived(fields, $fields => $fields.filter((f) => f.errors.length).length == 0)

export function openModal() {
    isOpen.set(true)
}

export function closeModal() {
    isOpen.set(false)
    resetFields()
}

export function addField() {
    fields.update(old => [...old, {
        id: uniqueId(),
        value: "",
        errors: []
    }])
}

export function resetFields() {
    fields.set([
        {
            id: uniqueId(),
            value: "",
            errors: ["Invalid email address"]
        }
    ])
}

export function removeField(id: string) {
    fields.update(old => old.length > 1 ? old.filter(field => field.id != id) : old)
}

export function addError(id: string, error: string) {
    fields.update(old => old.map(field => {
        if (field.id == id && !field.errors.includes(error)) {
            return {
                ...field,
                errors: [...field.errors, error]
            }
        }

        return field
    }))
}

export function removeError(id: string, error: string) {
    fields.update(old => old.map(field => {
        if (field.id == id && field.errors.includes(error)) {
            return {
                ...field,
                errors: field.errors.filter(err => err != error)
            }
        }

        return field
    }))
}

export function clearErrors(id: string) {
    fields.update(old => old.map(field => {
        if (field.id == id) {
            return {
                ...field,
                errors: []
            }
        }

        return field
    }))
}
