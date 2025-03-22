'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '../ui/command';
import { Calculator, Calendar, CommandIcon, Smile } from 'lucide-react';

export default function Search() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant='outline'
                    className='border inline-flex items-center justify-center text-sm font-medium hover:dark:bg-[#131313] hover:bg-slate-100  ease-in-out duration-200'
                >
                    <p className='text-sm text-muted-foreground'>Search Here...</p>
                    <div className='command dark:bg-[#262626] bg-slate-200  py-[2px] pl-[5px] pr-[7px] rounded-sm ml-[10rem] flex items-center gap-2'>
                        <CommandIcon />
                        <span className='text-[9px]'>F</span>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className='p-0'>
                <DialogHeader className='hidden'>
                    <DialogTitle>Find Country</DialogTitle>
                    <DialogDescription>
                        Search your country to get the latest weather information.
                    </DialogDescription>
                </DialogHeader>
                <Command className='rounded-lg border shadow-md md:min-w-[450px]'>
                    <CommandInput placeholder='Type a command or search...' />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading='Suggestions'>
                            <CommandItem>
                                <Calendar />
                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem>
                                <Smile />
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem>
                                <Calculator />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    );
}
