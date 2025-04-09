import React from 'react'
import { Button } from '@/components/ui/button'
import { Divide, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet'
import { UserType } from '@/types/user'
import { AuthButtons, SignoutButton, UserAvatar } from './UserComp'


interface MobileMenuProps {
    user: UserType | null
}
const MobileMenu = ({ user }: MobileMenuProps) => {
    return (
        <Sheet>
            <SheetTrigger className='md:hidden' asChild>
                <Button variant='ghost' size='icon'>
                    <Menu size={20} />
                </Button>
            </SheetTrigger>

            <SheetContent className='flex flex-col w-full md:max-w-sm' side='left'>
                <SheetHeader className='text-left '>
                    <SheetTitle className='text-primary text-xl'>
                        {user ? 'โปรไฟล์ของคุณ' : 'ยินดีต้อนรับ'}
                    </SheetTitle>
                </SheetHeader>
                <div>

                    {/* User Profile && Auth Buttons */}
                    {user ? <UserAvatar user= {user}/> : <AuthButtons />}

                    {/* Nav Link */}

                    {/* Go to admin page */}
                    {user && user.role === 'Admin' && <div>Go to admin page Button</div>}

                    {user && 
                        <SheetFooter>
                            <SignoutButton />
                        </SheetFooter>
                    }

                </div>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu