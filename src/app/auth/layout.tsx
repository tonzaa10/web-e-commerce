import React from 'react'
import { authCheck } from '@/features/auths/db/auths'
import { redirect } from 'next/navigation'
import HeaderCustomer from '@/components/customerPage/Headers/Header'
interface AuthLayoutProps {
    children: React.ReactNode
}
const AuthLayout = async ({ children }: AuthLayoutProps) => {
    const user = await authCheck()
    
    if (user) {
        redirect('/')
    }

    return (
        <>
            <div className='flex flex-col justify-center align-middle min-h-svh'>
                <HeaderCustomer user={null} />
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}
export default AuthLayout