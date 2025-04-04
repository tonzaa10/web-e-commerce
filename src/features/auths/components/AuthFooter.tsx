import { link } from 'fs'
import Link from 'next/link'
import React from 'react'

interface AuthFooterProps {
    type: 'signup' | 'signin'
}

const authTextMap = {
    signup: {
        FooterText: 'มีบัญชีอยู่แล้ว?',
        linkText: 'เข้าสู่ระบบ',
        linkHref: '/auth/signin'
    },
    signin: {
        FooterText: 'ยังไม่มีบัญชี',
        linkText: 'สมัครสมาชิก',
        linkHref: '/auth/signup'
    }
}

const AuthFooter = ({ type }: AuthFooterProps) => {

    const { FooterText, linkText, linkHref } = authTextMap[type]

    return (
        <div>
            <p className='text-accent-foreground'>
                {FooterText}{' '}<Link href={linkHref} className='text-primary hover:underline'>{linkText}</Link>
            </p>
        </div>
    )
}

export default AuthFooter