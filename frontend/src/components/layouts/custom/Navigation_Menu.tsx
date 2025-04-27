'use client';

import * as React from 'react';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { GoArrowRight } from 'react-icons/go';
import Image from 'next/image';
import { Men_WatchStyle, Women_WatchStyle } from '@/utils/Data_WatchStyle';
import { useRouter } from 'next/navigation';

enum Gender {
    MEN = 'men',
    WOMEN = 'women',
}

type MenuContentProps = {
    title: string;
    gender: Gender;
    onShopAll: (gender: string) => void;
    onItemStyle: (style: string) => void;
};

const MenuContent = ({ title, gender, onShopAll, onItemStyle }: MenuContentProps) => {
    const styles = gender === Gender.MEN ? Men_WatchStyle : Women_WatchStyle;

    return (
        <div>
            <div className='flex items-center justify-center gap-2 mb-3'>
                <h3 className='text-lg font-semibold pb-1'>{title}</h3>
                <div className='h-[0.1px] flex-1 bg-zinc-400 dark:bg-zinc-100/25' />
                <Button
                    className='group cursor-pointer'
                    size={'sm'}
                    onClick={() => onShopAll(gender === Gender.MEN ? 'Men' : 'Women')}
                >
                    Shop All
                    <GoArrowRight className='group-hover:translate-x-1.5 transition-transform duration-200' />
                </Button>
            </div>
            <div className='grid grid-cols-5 gap-4'>
                {styles.map((style) => (
                    <Button
                        key={style.watchType}
                        variant='ghost'
                        className='flex flex-col items-center gap-2 group p-2 h-auto'
                        onClick={() => onItemStyle(style.watchType)}
                    >
                        <div className='w-16 h-16 rounded-full overflow-hidden transition-transform group-hover:scale-110'>
                            <Image
                                src={style.img}
                                alt={style.watchType}
                                className='w-full h-full object-contain'
                                height={200}
                                width={200}
                            />
                        </div>
                        <span className='text-sm text-center font-medium'>{style.watchType}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default function NavigationMenuDemo() {
    const router = useRouter();
    const handleClick_ShopAll = (gender: string) => {
        router.push(`/products?gender=${gender}`);
    };

    const handleClick_ShopByItemStyle = (style: string) => {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set('style', style);
        const newSearch = currentParams.toString();
        router.push(`/products?${newSearch}`);
    };

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className='flex flex-col justify-center gap-7 p-2 w-[700px] overflow-hidden'>
                            <MenuContent
                                title="Men's Watches"
                                gender={Gender.MEN}
                                onShopAll={handleClick_ShopAll}
                                onItemStyle={handleClick_ShopByItemStyle}
                            />
                            <MenuContent
                                title="Women's Watches"
                                gender={Gender.WOMEN}
                                onShopAll={handleClick_ShopAll}
                                onItemStyle={handleClick_ShopByItemStyle}
                            />
                            <Button
                                className='w-full cursor-pointer'
                                size={'sm'}
                                onClick={() => handleClick_ShopAll('Kid')}
                            >
                                Kid's Watches
                            </Button>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href='/service' legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Service & Support
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href='/about' legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            About Us
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href='/compare' legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Compare
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
