import React from 'react'

interface AuthLayoutProps {
    children: React.ReactNode
}
function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <>
        <div className='flex flex-col justify-center align-middle min-h-svh'>
        <main>
                {children}
            </main>
        </div>
            
        </>
    )
}

export default AuthLayout