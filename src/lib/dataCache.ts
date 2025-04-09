type CACHE_TAG = 'users'

// Get global tag
export const getGlobalTag = (tag: CACHE_TAG) => {
    return `global:${tag}` as const
}
// Get id tag
export const getIdTag = (tag: CACHE_TAG, id: string) => {
    return `id${id}-${tag}` as const
}