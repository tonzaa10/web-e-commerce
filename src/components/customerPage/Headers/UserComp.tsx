'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SheetClose } from "@/components/ui/sheet"
import { useSignout } from "@/hooks/useSignOut"
import { Loader2 } from "lucide-react"
import { UserType } from "@/types/user"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"


interface UserCompProps {
    user: UserType
}


// ปุ่มลงทะเบียนและเข้าสู่ระบบ
export const AuthButtons = () => (
    <div className='flex justify-center gap-3'>
        <Button size='lg' asChild >
            <SheetClose asChild>
                <Link href='/auth/signup'>ลงทะเบียน</Link>
            </SheetClose>
        </Button>
        <Button variant='outline' size='lg' asChild >
            <SheetClose asChild>
                <Link href='/auth/signin'>เข้าสู่ระบบ</Link>
            </SheetClose>
        </Button>

    </div>
)

// ปุ่มออกจากระบบ
export const SignoutButton = () => {

    const { isPanding, handelSignout } = useSignout()

    return (
        <SheetClose asChild>
            <Button className='cursor-pointer' variant='destructive' size='lg' disabled={isPanding} onClick={handelSignout} >
                {isPanding ? <Loader2 /> : 'ออกจากระบบ'}
            </Button>
        </SheetClose>
    )
}

// ปุ่มดูข้อมูลส่วนตัว
export const UserAvatar = ({user} : UserCompProps) => (
    <div className='px-4'>
        <Card className="border-primary/50">
            <CardContent className='flex flex-col items-center gap-3'>
              {/* Picture */}
              <Image 
              src={user.picture || '/images/no-user-image.webp'} 
              alt={user.name || 'Profile'} width={128} height={128}
              priority
              className='rounded-full border-2 border-primary object-cover'/>

              {/* Name or Email */}
              <h2 className='text-xl font-semibold'>{user.name || user.email}</h2>
            </CardContent>
        </Card>
    </div>
)