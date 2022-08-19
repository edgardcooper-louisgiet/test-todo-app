import { useMemo, useRef } from "react"

export const useDebounceMap = <Key extends string>(keys: ReadonlyArray<Key>) => {
    const timeoutMapRef = useRef(keys.reduce<{[key in Key]: NodeJS.Timeout | null}>(
        (acc, key) => ({
            ...acc,
            key: null,
        }), {} as any)
    )

    const debounce = (key: Key, callback: () => void, delay = 1000) => {
        const timoutId = timeoutMapRef.current[key]

        if (timoutId !== null) clearTimeout(timoutId)

        timeoutMapRef.current[key] = setTimeout(callback, delay)
    }

    return debounce
}