import { UserType } from '@/types/user'
import MobileMenu from './MobileMenu'

import CartIcon from './CartIcon'
import { DesktopNavLink } from './NaveLink'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DesktopUserMenu from './DesktopUserMenu'

interface NavBarProps {
  user: UserType | null
}

const NavBar = ({ user }: NavBarProps) => {
  return (

    <nav className='flex items-center gap-x-3'>
      {/*Mobile Navigation */}
      {user && <CartIcon />}
      <MobileMenu user={user} />


      {/*Desktop Navigation */}
      <div className='hidden md:flex md:items-center'>
        <DesktopNavLink />
        {user ? (
          <DesktopUserMenu user={user} />
        ) : (
          <Button asChild size='sm'>
            <Link href='/auth/signin'>เข้าสู่ระบบ</Link>
          </Button>
        )}
      </div>
    </nav>

  )
}

export default NavBar