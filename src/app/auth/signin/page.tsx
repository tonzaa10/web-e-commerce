import React from 'react'

import AuthHeader from '@/features/auths/components/AuthHeader'
import AuthForm from '@/features/auths/components/AuthForm'

const SigninPage = () => {
  return (
    <AuthHeader type='signin'>
        <AuthForm type='signin' />
    </AuthHeader>
  )
}

export default SigninPage