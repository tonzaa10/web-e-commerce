import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import NavBar from './NavBar'
import { UserType } from '@/types/user'


interface HeaderCustomerProps {
    user: UserType | null
}

const HeaderCustomer = ({ user }: HeaderCustomerProps) => {
    return (
        <header className='fixed top-0 inset-x-0 z-40 border-b border-b-border
        shadow-sm '>
            <div className='max-w-7xl mx-auto px-4 xl:px-0 flex justify-between items-center h-16'>
                {/*Icon */}

                <Link href='/' className='flex items-center gap-x-2 text-primary'>
                    <ShoppingBag size={28} />
                    <h2 className='text-xl font-bold'>Ton Store</h2>
                </Link>

                {/*Menu*/}
                <NavBar user={user} />
            </div>
        </header>
    )
}

export default HeaderCustomer