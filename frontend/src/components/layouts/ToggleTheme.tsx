'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { FaCloudSun, FaCloudMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function ToggleTheme() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant='ghost'
            className='border group flex items-center gap-2 rounded-lg group'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <motion.div
                initial={{ rotate: 0, y: 0 }}
                whileHover={{ rotate: 20, y: -5, scale: 1.3 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
                {theme === 'light' ? (
                    <FaCloudMoon className='text-zinc-700' />
                ) : (
                    <FaCloudSun className='text-yellow-300' />
                )}
            </motion.div>
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
        </Button>
    );
}
