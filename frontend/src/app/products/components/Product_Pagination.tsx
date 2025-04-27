'use client';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    onPageChange: (page: number) => void;
};

export default function Product_Pagination({
    currentPage,
    totalPages,
    totalProducts,
    onPageChange,
}: PaginationProps) {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // 1, ...,      start,      currentPage,       end,       ..., totalPages
            // 1, ..., currentPage - 1, currentPage, currentPage + 1, ..., totalPages
            // 1  ...          4            5               6         ...       10
            pageNumbers.push(1);

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                end = 4;
            }

            if (currentPage >= totalPages - 2) {
                start = totalPages - 3;
            }

            if (start > 2) {
                pageNumbers.push('...');
            }

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            if (end < totalPages - 1) {
                pageNumbers.push('...');
            }

            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    if (totalPages <= 1) return null;

    return (
        <div className='flex flex-col items-center gap-2 py-6'>
            <span className='text-sm text-muted-foreground'>
                Page {currentPage} of {totalPages} ({totalProducts} products)
            </span>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                            className={
                                currentPage <= 1
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>

                    {getPageNumbers().map((pageNumber, index) => (
                        <PaginationItem key={index}>
                            {pageNumber === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    onClick={() => onPageChange(pageNumber as number)}
                                    isActive={currentPage === pageNumber}
                                    className='cursor-pointer'
                                >
                                    {pageNumber}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                currentPage < totalPages && onPageChange(currentPage + 1)
                            }
                            className={
                                currentPage >= totalPages
                                    ? 'pointer-events-none opacity-50'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
