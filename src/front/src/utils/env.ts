
export function env(key: string): string {

    if (typeof import.meta.env[key] === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return import.meta.env[key] as string
}
