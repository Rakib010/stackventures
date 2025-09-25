"use server"
import { FieldValues } from "react-hook-form"

export const register = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        // Error response handle koro
        const error = await res.json().catch(() => null)
        console.error("User Registration Failed:", error || res.statusText)
        throw new Error(error?.message || "Registration failed")
    }

    // Success case
    const result = await res.json()
    return result
}


export const login = async (data: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        // Error response handle koro
        const error = await res.json().catch(() => null)
        console.error("User Registration Failed:", error || res.statusText)
        throw new Error(error?.message || "Registration failed")
    }

    // Success case
    const result = await res.json()
    return result
}
