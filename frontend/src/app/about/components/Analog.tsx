import React from 'react';

export default function Analog() {
    return (
        <div className='container mx-auto flex flex-col items-center space-y-10 pt-8'>
            <h1 className='text-6xl md:text-8xl font-serif font-extrabold text-center mt-4'>
                <span className='text-yellow-500/80 dark:text-yellow-300/90'>time</span> is life's
                true luxury
            </h1>

            <div className='flex flex-col md:flex-row justify-center gap-16 w-full max-w-6xl mt-8'>
                <div className='flex-1 text-lg md:text-xl font-sans text-left space-y-6'>
                    <p>
                        At{' '}
                        <span className='text-emerald-600/80 dark:text-emerald-500 font-semibold'>
                            WatchStore
                        </span>
                        , we believe in the beauty of simply great watchmaking. For 170 years, we've
                        crafted timepieces that do more than tell time—they keep it simple, allowing
                        you to relish in the authentic moments that make life special.
                    </p>
                    <p>
                        In a fast-paced, always-connected world, it's easy to lose sight of what
                        matters. But when you pause and look up, that's when life truly unfolds.
                        Your Timex is more than just a watch; it's a reminder to live intentionally
                        and savor every second.
                    </p>
                </div>
                <div className='flex-1 text-lg md:text-xl font-sans text-left space-y-6'>
                    <p>
                        Since day one, our watches have been about quality and reliability, designed
                        to help you immerse yourself in the little things—the conversations that
                        light you up, the adventures that surprise you, and the quiet moments that
                        ground you.
                    </p>
                    <p>
                        Find joy in the simplicity of an analog life, where every second feels a
                        little more yours.
                        <br />
                        <span className='text-yellow-500/80 dark:text-yellow-300/90 font-bold'>
                            Take a breath. Take a moment. Make Time Yours.
                        </span>
                    </p>
                </div>
            </div>

            <div className='flex flex-col items-center w-full'>
                <div className='flex items-center justify-center gap-2 w-full px-18'>
                    <div className='h-0.5 bg-zinc-700/30 w-1/3' />
                    <h2 className='text-6xl md:text-7xl font-serif font-normal italic text-center flex-1 tracking-wide'>
                        analog life
                    </h2>
                    <div className='h-0.5 bg-zinc-700/30 w-1/3' />
                </div>
                <p className='text-2xl font-serif mt-2'>Make time yours.</p>
            </div>
        </div>
    );
}
