'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '../redux/store';
import { ToastContainer } from 'react-toastify';

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const storeRef = useRef<AppStore>(undefined);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    if (!mounted) return null;
    return (
        <NextThemesProvider {...props}>
            <Provider store={storeRef.current}>{children}</Provider>
            <ToastContainer
                position='bottom-right'
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light'
            />
        </NextThemesProvider>
    );
}
