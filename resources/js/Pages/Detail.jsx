import Headline from '@/Components/Home/Headline';
import { NewsList } from '@/Components/NewsList';
import { Pagination } from '@/Components/Pagination';
import Unauthenticated from '@/Layouts/UnauthenticatedLayout';
import { Head } from '@inertiajs/react';
export default function Detail(props) {
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return url;
        } catch (e) {
            return window.location.origin + '/uploads/' + url;
        }
    }

    return (
        <Unauthenticated
            auth={props.auth}
        >
            <Head title={props.news.title} />
            <div className="py-12 bg-gray-900 text-white mb-48">
                <div className="mx-auto mb-36 sm:px-6 lg:px-8 relative">
                    <div className='flex'>
                        <div className='w-10/12 self-center z-10'>
                            <p className='font-bold text-7xl mb-6'>{props.news.title}</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='w-3/12 flex'>
                            <img src='https://picsum.photos/1000/500?random=1' alt={props.news.author} className='w-12 h-12 mr-3 rounded-full object-cover' />
                            <div>
                                <p className='font-bold'>Author</p>
                                <p className='mb-6'>{props.news.author}</p>
                            </div>
                        </div>
                        <div className='w-3/12'>
                            <p className='font-bold'>Category</p>
                            <p className='mb-6'>{props.news.category.title}</p>
                        </div>
                        <div className='w-3/12 flex'></div>
                        <div className='w-3/12 flex'>
                            <p className='mb-6'>{props.news.subtitle}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative h-0 sm:px-6 lg:px-8'>
                <div className='absolute bottom-0 w-full'>
                    <img src={isValidUrl(props.news.media.url)} className='h-96 w-fit object-cover' />
                </div>
            </div>
            <div className='py-12'>
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div dangerouslySetInnerHTML={{ __html: props.news.content }} />
                </div>
            </div >
        </Unauthenticated >
    );
}
