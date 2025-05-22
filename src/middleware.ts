import { NextResponse, NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

interface Payload extends JWTPayload {
    id: string
}


// Function to decrypt JWT token
const decryptJwtToken = async (token: string): Promise<Payload | null> => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY); // Replace with your secret key
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload as Payload

    } catch (error) {
        return null
    }
}

// Middleware function to check if user is authenticated
export const middleware = async (req: NextRequest) => {

    const response = NextResponse.next() // Create NextResponse object

    const token = req.cookies.get('token')?.value
    if (!token) return response

    const payload = await decryptJwtToken(token) // Decrypt JWT token

    const isTokenExpired = payload?.exp && payload.exp < Date.now() / 1000 // Check if token is expired
    if (!payload || isTokenExpired) {
        response.cookies.delete('token')
        return response
    }

    response.headers.set('x-user-id', payload.id) // Set user ID in response headers
    return response
}

// Middleware function to check if user is authenticated
export const config = {
    matcher: [
        '/',
        '/auth/:path*', // Check Auth
        '/admin/:path*' // Check Admin

    ]
}
