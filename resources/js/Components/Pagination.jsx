import { Link } from "@inertiajs/react"
import { map } from "lodash"

export const Pagination = ({ meta }) => {
    const prevPage = meta.current_page > 1 ? meta.current_page - 1 : null
    const nextPage = meta.current_page < meta.last_page ? meta.current_page + 1 : null
    const prevLink = prevPage ? meta.links[0].url : null
    const nextLink = nextPage ? meta.links[meta.links.length - 1].url : null
    const firstLink = meta.links[1].url
    const lastLink = meta.links[meta.links.length - 2].url

    let pages = []
    for (let index = 0; index < meta.last_page; index++) {
        pages.push(
            <button type="button" key={index}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => changePage(index + 1)}>
                {index + 1}
            </button>
        );
    }
    // return pages;
    return (
        <div className="inline-flex rounded-md overflow-hidden shadow-sm" role="group">
            {
                prevLink &&
                <>
                    <Link href={firstLink} className="px-3 py-2 flex items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </Link>
                    <Link href={prevLink} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        {prevPage}
                    </Link>
                </>
            }
            <Link href={''} className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border border-gray-200  focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                {meta.current_page}
            </Link>
            {
                nextLink &&
                <>
                    <Link href={nextLink} className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        {nextPage}
                    </Link>
                    <Link href={lastLink} className="px-3 py-2 flex items-center text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-lg hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                </>
            }
            {/* {pages} */}
        </div>
    )
}
