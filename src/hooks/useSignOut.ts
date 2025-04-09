
import { useTransition } from "react";
import { signoutAction } from "@/features/auths/actions/auths";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const useSignout = () => {
    const [isPanding, startTransition] = useTransition();
    const router = useRouter()

    const handelSignout = () => {
        startTransition(async () => {
            const result = await signoutAction()
            if(result.success) {
                toast.success(result.message)
                router.push('/auth/signin')
            } else {
                toast.error(result.message)
            }
        })
    }

    return {isPanding, handelSignout}
}