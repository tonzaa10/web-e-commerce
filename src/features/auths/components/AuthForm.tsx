'use client'

import React from 'react'
import { CardContent, CardFooter } from '@/components/ui/card'
import Form from 'next/form'
import InputForm from '@/components/shared/InputForm'
import SubmitBTN from '@/components/shared/SubmitBTN'
import AuthFooter from './AuthFooter'
import { useForm } from '@/hooks/useForm'
import { authAction } from '../actions/auths'
import ErrorMessage from '@/components/shared/ErrorMessage'


interface AuthFormProps {
    type: 'signup' | 'signin'
}

const AuthForm = ({ type }: AuthFormProps) => {
    const renderInput = (label: string, id: string, type = 'text', required = false) => (
        <div className='flex flex-col gap-3'>
            <InputForm label={label} id={id} type={type} required={required} />
            {errors[id] && <ErrorMessage error={errors[id]![0]} />}
        </div>
    )

 const {errors, formAction, isPanding, clearErrors} = useForm(authAction,'/')

    return (
        <Form action={formAction} onChange={clearErrors}>
            <CardContent className='flex flex-col gap-3'>
                {type === 'signup' && renderInput('ชื่อผู้ใช้', 'name')}
                {renderInput('อีเมล', 'email', 'email', true)}
                {renderInput('รหัสผ่าน', 'password', 'password', true)}
                {type === 'signup' && renderInput('ยืนยันรหัสผ่าน', 'confirmPassword', 'password', true)}
            </CardContent>
            <CardFooter className='pt-4 flex flex-col gap-3'>
                <AuthFooter type={type} />
                <SubmitBTN name={type === 'signup' ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'} className='w-full' padding={isPanding} />
            </CardFooter>
        </Form>
    )
}

export default AuthForm