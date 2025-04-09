import { getGlobalTag, getIdTag } from "@/lib/dataCache";
import { get } from "http";
import { revalidateTag } from "next/cache";


// Get user global tag
export const getuserGlobalTag = () => {
    return getGlobalTag('users')
}

// Get user id tag
export const getUserIdTag = (id: string) => {
    return getIdTag('users', id)
}

// Revalidate user cache
export const revalidateUserCache = (id: string) => {
    revalidateTag(getuserGlobalTag())
    revalidateTag(getUserIdTag(id))

}