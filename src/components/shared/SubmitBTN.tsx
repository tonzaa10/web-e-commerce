import React from 'react'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface SubmitBTNProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string,
    padding?: boolean
}

const SubmitBTN = ({ name, padding = false, ...props }: SubmitBTNProps) => {
    return (
        <Button type='submit' disabled={padding} {...props}>
            {padding ? <Loader2 size={16} className='animate-spin' /> : name}
        </Button>
    )
}

export default SubmitBTN