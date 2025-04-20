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

const Men_WatchStyle: { img: string; watchType: string }[] = [
    {
        img: 'https://timex.com/cdn/shop/files/Automatic-Icon-TW2Y07300.png?v=1741709564',
        watchType: 'Automatic',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Chronograph_Nav_icon_image_TW2V42800.png?v=1722369370',
        watchType: 'Chronograph',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Mens-Digital_Nav_icon_image_TW2R79300.png?v=1722369481',
        watchType: 'Digital',
    },
    {
        img: 'https://timex.com/cdn/shop/files/BlackWatches_TW2V70300v2.png?v=1722365574',
        watchType: 'Black Watches',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Vintage_Nav_icon_image_TW2T80700.png?v=1722369453',
        watchType: 'Vintage',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Stainless-Steel_TW2W10400.png?v=1722369672',
        watchType: 'Stainless Steel',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Automatic_Nav_icon_image_TW2V54000.png?v=1722369336',
        watchType: 'Titanium',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Mens-Leather_Nav_icon_image_TW2W47900.png?v=1722369397',
        watchType: 'Leather',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Military-Inspired_Nav_icon_image_TW2V00400.png?v=1722369426',
        watchType: 'Military Inspired',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Diver-Inspired_Nav_icon_image_TW2W21000.png?v=1722369477',
        watchType: 'Diver Inspired',
    },
];

const Women_WatchStyle: { img: string; watchType: string }[] = [
    {
        img: 'https://timex.com/cdn/shop/files/Womens-Small_Nav_icon_image_T2J761.png?v=1722369862',
        watchType: 'Small',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Womens-Bracelet_Nav_icon_image_TW2V68400.png?v=1722369888',
        watchType: 'Bracelet',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Womens-Gold-Tone_Nav_icon_image_TW2V80000.png?v=1722369917',
        watchType: 'Gold-Tone',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Womens-silver-tone_Nav_icon_image_TW2U92900.png?v=1722369947',
        watchType: 'Siver-Tone',
    },
    {
        img: 'https://timex.com/cdn/shop/files/Womens-Digital_Nav_icon_image_TW2V74400.png?v=1722370017',
        watchType: 'Digital',
    },
];

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
}

type MenuContentProps = {
    title: string;
    gender: Gender;
};

const MenuContent = ({ title, gender }: MenuContentProps) => {
    const styles = gender === Gender.MALE ? Men_WatchStyle : Women_WatchStyle;

    return (
        <div>
            <div className='flex items-center justify-center gap-2 mb-3'>
                <h3 className='text-lg font-semibold pb-1'>{title}</h3>
                <div className='h-[0.1px] flex-1 bg-zinc-400 dark:bg-zinc-100/25' />
                <Button className='group cursor-pointer' size={'sm'}>
                    Shop All
                    <GoArrowRight className='group-hover:translate-x-1.5 transition-transform duration-200' />
                </Button>
            </div>
            <div className='grid grid-cols-5 gap-4'>
                {styles.map((style) => (
                    <Link
                        key={style.watchType}
                        href={`/products/men?style=${style.watchType.toLowerCase()}`}
                        className='flex flex-col items-center gap-2 group'
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
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default function NavigationMenuDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className='flex flex-col justify-center gap-7 p-2 w-[700px] overflow-hidden'>
                            <MenuContent title="Men's Watches" gender={Gender.MALE} />
                            <MenuContent title="Women's Watches" gender={Gender.FEMALE} />
                            <Button className='w-full cursor-pointer' size={'sm'}>
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
