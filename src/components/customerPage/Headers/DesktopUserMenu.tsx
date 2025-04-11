import { UserType } from '@/types/user'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SignoutButton, UserAvatarSmall, UserDropdownAvatar } from './UserComp'
interface DesktopUserMenuProps {
    user: UserType
}
const DesktopUserMenu = ({ user }: DesktopUserMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='size-8 rounded-full' variant='ghost'size='icon'>
                    <UserAvatarSmall user={user} /> 
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align='end'
                sideOffset={4}
                className='w-56'
            >
                <DropdownMenuLabel className='flex flex-col items-center gap-2'>
                    <UserDropdownAvatar user={user} />
                    <span>สวัสดี, {user.name || user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/profile'>โปรไฟล์ของฉัน</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/cart'>
                        <span>ตะกร้าของฉัน</span>
                        <Badge className='ml-auto'>0</Badge>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer' asChild>
                    <Link href='/my-orders'>ประวัติการสั่งซื้อ</Link>
                </DropdownMenuItem>
                {user.role === 'Admin' && (
                    <>
                     <DropdownMenuSeparator/>
                        <DropdownMenuItem className='cursor-pointer' asChild>
                            <Link href='/admin'>หลังบ้าน</Link>
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuSeparator/>
                    <div>
                        <SignoutButton />
                    </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default DesktopUserMenu