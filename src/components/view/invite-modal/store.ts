import { uniqueId } from "lodash";
import { writable } from "svelte/store";

interface Field {
    id: string
    value: string
}

export const isOpen = writable(false)
export const fields = writable<Field[]>([
    {
        id: uniqueId(),
        value: ""
    }
])

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
        value: ""
    }])
}

export function resetFields() {
    fields.set([
        {
            id: uniqueId(),
            value: ""
        }
    ])
}

export function removeField(id: string) {
    fields.update(old => old.length > 1 ? old.filter(field => field.id != id) : old)
}