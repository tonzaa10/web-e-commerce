import { UserType } from '@/types/user'
import MobileMenu from './MobileMenu'

import CartIcon from './CartIcon'

interface NavBarProps {
  user: UserType | null
}

const NavBar = ({ user }: NavBarProps) => {
  return (

    <nav className='flex items-center gap-x-3'>
      {/*Mobile Navigation */}
      {user && <CartIcon />}
      <MobileMenu />


      {/*Desktop Navigation */}
      <div className='hidden'>
        <div>Desktop Menu</div>
        {user ? (
          <div>Desktop User Menu</div>
        ) : (
          <div>Go to signin button</div>
        )}
      </div>
    </nav>

  )
}

export default NavBar