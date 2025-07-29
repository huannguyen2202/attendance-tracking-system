import LoginPage from '@/components/Auth/login/login'
import InitAOS from '@/components/Comon/initAOS'
import React from 'react'

const page = () => {
    return (
        <div>
            <InitAOS />
            <LoginPage />
        </div>
    )
}

export default page