import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export function Paginate({ className, children, total, per_page, page }: { className?: string, children?: React.ReactNode, total: number, per_page: number, page: number }) {

    return (
        <Pagination>
            <PaginationContent>
                <PaginationPrevious />
                <PaginationNext />
                <PaginationEllipsis />
                <PaginationItem>{page}</PaginationItem>
                <PaginationEllipsis />
                <PaginationItem>{total}</PaginationItem>
                <PaginationEllipsis />
            </PaginationContent>
        </Pagination>
    )
}
