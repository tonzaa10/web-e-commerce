import React from 'react'

import type { Metadata } from 'next'
import AuthHeader from '@/features/auths/components/AuthHeader'
import AuthForm from '@/features/auths/components/AuthForm'

export const metadata: Metadata = {
    title: 'สมัครสมาชิก',
    description: 'ร้านค้าออนไลน์อันดับ 1 สำหรับสินค้าไอทีครบวงจร พร้อบริการจัดส่งเร็วราคาคุ้มค่า',
}

function SignupPage() {
    const type = 'signup'
    return (
        <div>
            <AuthHeader type={type}>
                <AuthForm type={type} />
            </AuthHeader>
        </div>
    )
}

export default SignupPage