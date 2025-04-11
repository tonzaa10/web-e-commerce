import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import Link from "next/link"
import { title } from "process"

const NAV_LINKS = [
    { title: 'หน้าหลัก', href: '/' },
    { title: 'สินค้าทั้งหมด', href: '/products' },
    { title: 'เกี่ยวกับ', href: '/aobut' },
    { title: 'ติดต่อเรา', href: '/contact' },
]

//
export const MobileNavLink = () => (
    <div className='flex flex-col gap-2 mt-2'>
        {NAV_LINKS.map((link, index) => (
            <SheetClose asChild key={index}>
                <Button asChild variant='secondary' size='lg'>
                    <Link href={link.href} className="flex items-center gap-2">{link.title}</Link>
                </Button>
            </SheetClose>
        ))}
    </div>

)

export const DesktopNavLink = () => (
    <div className='flex items-center gap-1'>
        {NAV_LINKS.map((link, index) => (
            <Button asChild variant='ghost'  size='sm' key={index}>
                <Link href={link.href} className="flex items-center gap-2">{link.title}</Link>
            </Button>
        ))}
    </div>
)