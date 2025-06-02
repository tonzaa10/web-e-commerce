import React from 'react'

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SlidebarLinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  isActive?: boolean;
}
const SlidebarLink = ({ label, href, icon, isActive }: SlidebarLinkProps) => {
  return (
    <Button asChild
    variant={isActive ? 'secondary' : 'ghost'}>
      <Link href={href} className={cn(
        'w-full justify-start gap-3',
        isActive ? 'font-semibold':'text-muted-foreground hover:text-foreground'
        )}>
        {icon}
        <span>{label}</span>
      </Link>
    </Button>
  )
}

export default SlidebarLink