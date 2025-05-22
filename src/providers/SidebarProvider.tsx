'use client'
import { createContext, useState, useContext, use } from 'react' // Hook
interface SidebarProviderType {
    isSidebarOpen: boolean
    toggleSiddebar: () => void
}


const SidebarContext = createContext<SidebarProviderType | undefined>(undefined)

export const SidebarProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSiddebar = () => setIsSidebarOpen(prev => !prev)

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSiddebar }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const userSlidebar = () => {
    const context = useContext(SidebarContext)

    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider')
    }

    return context
}