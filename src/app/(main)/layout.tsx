import HeaderCustomer from '@/components/customerPage/Headers/Header'
import { authCheck } from '@/features/auths/db/auths'

interface MainLayoutProps {
  children: React.ReactNode
}
const MainLayout = async ({ children }: MainLayoutProps) => {

  const user = await authCheck()

  return (
    <div className='min-h-svh flex flex-col'>
      <HeaderCustomer user={user} />
      <main className='pt-16 max-7/xl mx-auto px-4 xl:px-0'>{children}</main>
    </div>

  )
}

export default MainLayout