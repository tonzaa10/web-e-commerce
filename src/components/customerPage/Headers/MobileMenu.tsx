import React from 'react'
import { Button } from '@/components/ui/button'
import { Divide, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet'
import { UserType } from '@/types/user'
import { AuthButtons, SignoutButton, UserAvatar } from './UserComp'
import { MobileNavLink } from './NaveLink'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
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
                <div className='flex flex-1 flex-col gap-6'>
                    {/* User Profile && Auth Buttons */}
                    {user ? <UserAvatar user={user} /> : <AuthButtons />}
                    <Separator />
                    <div className='px-4'>
                        <ScrollArea className='h-48 sm:h-60 w-full'>
                            {/* Nav Link */}
                            <MobileNavLink />
                            {/* Go to admin page */}
                            {user && user.role === 'Admin' && (
                                <div className='mt-4 pb-4'>
                                    <Separator className='mb-4' />
                                    <Button variant='secondary' size='lg' className='w-full'>
                                        <Link href='/admin'>หลังบ้าน</Link>
                                    </Button>
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>
                {user &&
                    (<SheetFooter>
                        <SignoutButton isMobile />
                    </SheetFooter>
                    )}
            </SheetContent>
        </Sheet>
    )
}
export default MobileMenu