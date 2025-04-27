'use client';

import { ChevronRight, Home } from 'lucide-react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';

export default function Product_Breadcrumb({ breadcumLink }: { breadcumLink: string }) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className='hover:scale-105 transition-transform'>
                    <BreadcrumbLink
                        href='/'
                        className={cn(
                            'text-muted-foreground hover:text-primary transition-colors duration-200',
                            'flex items-center gap-1.5 text-sm font-medium'
                        )}
                    >
                        <Home className='w-4 h-4' />
                        Home
                    </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator>
                    <ChevronRight className='w-4 h-4 text-muted-foreground/50' />
                </BreadcrumbSeparator>

                <BreadcrumbItem className='hover:scale-105 transition-transform'>
                    <BreadcrumbLink
                        href='/products'
                        className={cn(
                            ' font-medium',
                            'hover:text-primary/80 transition-colors duration-200'
                        )}
                    >
                        {breadcumLink}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
