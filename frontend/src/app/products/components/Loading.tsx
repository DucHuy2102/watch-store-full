import { motion } from 'framer-motion';
import { AiOutlineLoading } from 'react-icons/ai';

export default function Loading() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className='flex items-center justify-center space-x-2 text-xl text-zinc-500'
        >
            <AiOutlineLoading className='animate-spin text-2xl' />
            <span>Loading...</span>
        </motion.div>
    );
}
