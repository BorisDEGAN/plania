import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = ({ currentPage, lastPage, total, onPageChange }: { currentPage: number, lastPage: number, total: number, onPageChange: (page: number) => void }) => {
    const previousPage = () => {
        onPageChange(currentPage - 1);
    };

    const nextPage = () => {
        onPageChange(currentPage + 1);
    };

    return (
        <ul className="flex justify-center space-x-1 my-8">
            <li>
                <button
                    onClick={previousPage}
                    disabled={currentPage === 1}
                    title="Previous Page"
                    type="button"
                    className="hover:scale-125 duration-300 inline-flex items-center justify-center w-8 h-8 py-0 rounded text-zinc-500 shadow-md"
                >
                    <ArrowLeft className="w-8 h-8 p-[1px]" />
                </button>
            </li>
            <li className="p-2 shadow-inner rounded">
                Page {currentPage} / {lastPage} | Total: {total}
            </li>
            <li>
                <button
                    onClick={nextPage}
                    disabled={currentPage === lastPage}
                    title="Next Page"
                    type="button"
                    className="hover:scale-125 duration-300 inline-flex items-center justify-center w-8 h-8 py-0 rounded text-zinc-500 shadow-md"
                >
                    <ArrowRight className="w-8 h-8 p-[1px]" />
                </button>
            </li>
        </ul>
    );
};

export default Pagination;
