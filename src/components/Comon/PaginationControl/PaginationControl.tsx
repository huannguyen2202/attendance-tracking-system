// components/PaginationControl.tsx
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ChevronsLeft, ChevronsRight } from "lucide-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationControl = ({ page, totalPages, onPageChange }: PaginationProps) => {
    const maxPageShown = 5;
    const half = Math.floor(maxPageShown / 2);
    let start = Math.max(page - half, 1);
    let end = start + maxPageShown - 1;

    if (end > totalPages) {
        end = totalPages;
        start = Math.max(end - maxPageShown + 1, 1);
    }

    const visiblePages = [];
    for (let i = start; i <= end; i++) {
        visiblePages.push(i);
    }

    const handlePrev = () => {
        if (page > 1) onPageChange(page - 1);
    };

    const handleNext = () => {
        if (page < totalPages) onPageChange(page + 1);
    };

    const handleFirst = () => {
        if (page !== 1) onPageChange(1);
    };

    const handleLast = () => {
        if (page !== totalPages) onPageChange(totalPages);
    };

    return (
        <Pagination>
            <PaginationContent>
                {/* First page */}
                <PaginationItem>
                    <PaginationLink
                        onClick={handleFirst}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    >
                        <ChevronsLeft />
                    </PaginationLink>
                </PaginationItem>

                {/* Previous */}
                <PaginationItem>
                    {/* <PaginationLink
                        onClick={handlePrev}
                        className={`flex items-center gap-1 ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </PaginationLink> */}
                    <PaginationPrevious
                        onClick={handlePrev}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                    >
                        Trang trước
                    </PaginationPrevious>
                </PaginationItem>

                {/* Page numbers */}
                {visiblePages.map((p) => (
                    <PaginationItem key={p}>
                        <PaginationLink
                            isActive={p === page}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                    {/* <PaginationLink
                        onClick={handleNext}
                        className={`flex items-center gap-1 ${page === totalPages ? "pointer-events-none opacity-50" : ""}`}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </PaginationLink> */}
                    <PaginationNext
                        onClick={handleNext}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    >
                        Trang sau
                    </PaginationNext>
                </PaginationItem>

                {/* Last page */}
                <PaginationItem>
                    <PaginationLink
                        onClick={handleLast}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                    >
                        <ChevronsRight />
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationControl;
