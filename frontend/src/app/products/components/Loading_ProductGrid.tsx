import { motion } from 'framer-motion';
import { AiOutlineLoading } from 'react-icons/ai';

export default function Loading() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className='min-h-screen flex flex-col items-center justify-center gap-4'
        >
            <div className='relative'>
                <div className='h-24 w-24 rounded-full border-t-4 border-b-4 border-primary animate-spin' />
                <AiOutlineLoading className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl text-primary animate-pulse' />
            </div>
            <motion.span
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-xl font-medium text-muted-foreground tracking-wide'
            >
                Loading your watches...
            </motion.span>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='text-sm text-muted-foreground/60'
            >
                Please wait while we fetch the latest collection
            </motion.div>
        </motion.div>
    );
}
