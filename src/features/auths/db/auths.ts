import { Input } from '@/components/ui/input';

import { signupSchema, signinSchema } from '@/features/auths/schemas/auths';
import { db } from '@/lib/db';
import { compare, genSalt, hash } from 'bcrypt';
import { SignJWT } from 'jose';
import { cookies, headers } from 'next/headers';
import { UserStatus } from '@prisma/client';
import { getUserById } from '@/features/users/db/users';
import { use } from 'react';
import { revalidateUserCache } from '@/features/users/db/cashe';



interface SignupInput {
    name: string
    email: string
    password: string
    confirmPassword: string
}

interface SingninInput {
    email: string
    password: string
}

// Function to generate JWT token
const gennerateJwtToken = async (userId: string) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // Replace with your secret key
    return await new SignJWT({ id: userId }) // Set the payload
        .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm to HS256
        .setIssuedAt() // Set the issued at time
        .setExpirationTime('30d') // Set the expiration time
        .sign(secret); // Sign the JWT with the secret key
}

// Function to set cookie token
const setCookieToken = async (token: string) => {
    const cookie = await cookies()
    cookie.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })
}

// Function to handle user signup
export const signup = async (input: SignupInput) => {
    try {
        const { success, data, error } = signupSchema.safeParse(input)
        if (!success) {
            return {
                message: 'กรุณนากรอกข้อมูลให้ถูกต้อง',
                error: error.flatten().fieldErrors
            };
        }

        // Check if email is already in use
        const user = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        // Check if user already exists
        if (user) {
            return {
                message: 'อีเมลนี้มีผู้ใช้งสานแล้ว',
            };
        }

        // Create a new user
        const salt = await genSalt(10);
        const hashedPassword = await hash(data.password, salt);

        const newUser = await db.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            }
        })

        // Generate JWT token
        const token = await gennerateJwtToken(newUser.id)
        await setCookieToken(token)

        revalidateUserCache(newUser.id)


    } catch (error) {
        console.error('Error signing up:', error);
        return {
            message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก',
        };
    }
}

// Function to handle user signin
export const signin = async (input: SignupInput) => {
    try {
        const { success, data, error } = signinSchema.safeParse(input)
        if (!success) {
            return {
                message: 'กรุณากรอกข้อมูลให้ถูกต้อง',
                error: error.flatten().fieldErrors
            }
        }

        const user = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        // Check if user exists
        if (!user) {
            return {
                message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
            }
        }
        //Check user status
        if (user.status !== UserStatus.ACTIVE) {
            return {
                message: 'บัญชีของคุณไม่พร้อมใช้งาน'
            }
        }
        //Ccheck password
        const isValidPassword = await compare(data.password, user.password)
        if (!isValidPassword) {
            return {
                message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
            }
        }

        // Generate JWT token
        const token = await gennerateJwtToken(user.id)
        await setCookieToken(token)

    } catch (error) {
        console.error('Error sign in user:', error)
        return {
            message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
        }
    }
}

// Function to handle user logout
export const authCheck = async () => {
    const userId = (await headers()).get('x-user-id')
    return userId ? await getUserById(userId) : null
}


export const signout = async () => {
    try {
        (await cookies()).delete('token')
    } catch (error) {
        console.error('Error sign out user:', error)
        return {
            message: 'เกิดข้อผิดพลาดในการออกจากระบบ',
        }
    }
}
