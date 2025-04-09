
import { db } from '@/lib/db'
import {
    unstable_cacheLife as cacheLife,
    unstable_cacheTag as cacheTag
} from 'next/cache'
import { getUserIdTag } from './cashe'


export const getUserById = async (id: string) => {
    'use cache'

    cacheLife('hours')
    cacheTag(getUserIdTag(id))

    try {
        const user = await db.user.findUnique({
            where: { id, status: 'ACTIVE' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                address: true,
                picture: true,
                tel: true,
            }
        })

        console.log('user', user)
        return user;
    } catch (error) {
        console.error('Error getting user by ID:', error);
        return null;
    }
}