import { NewsList } from '@/Components/NewsList';
import { Pagination } from '@/Components/Pagination';
import Unauthenticated from '@/Layouts/UnauthenticatedLayout';
import { Head } from '@inertiajs/react';
export default function Home(props) {
    return (
        <Unauthenticated>
            <Head title="Home" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='mb-6'>
                        <NewsList news={props.news} />
                    </div>
                    <Pagination meta={props.news.meta} />
                </div>
            </div>
        </Unauthenticated>
    );
}
