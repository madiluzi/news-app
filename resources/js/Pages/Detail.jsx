import Headline from '@/Components/Home/Headline';
import { NewsList } from '@/Components/NewsList';
import { Pagination } from '@/Components/Pagination';
import Unauthenticated from '@/Layouts/UnauthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import CategoryList from './../Components/CategoryList';
export default function Detail(props) {
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return url;
        } catch (e) {
            return '/storage/' + url;
        }
    }

    return (
        <Unauthenticated
            auth={props.auth}
        >
            <Head title={props.news.title} />
            <div className="py-12 lg:px-0 bg-gray-900 text-white mb-48">
                <div className="mx-auto mb-36 px-4 sm:px-6 lg:px-8 relative">
                    <div className='flex'>
                        <div className='w-full lg:w-10/12 self-center z-10'>
                            <p className='font-bold text-5xl lg:text-7xl mb-6'>{props.news.title}</p>
                        </div>
                    </div>
                    <div className='flex gap-2 lg:gap-0'>
                        <div className='w-6/12 lg:w-3/12 flex mb-6'>
                            <Link href={route('author', props.news.author_id)}>
                                <img src='https://picsum.photos/1000/500?random=1' alt={props.news.author.name} className='w-12 h-12 mr-3 rounded-full object-cover' />
                            </Link>
                            <div>
                                <p className='font-bold'>Author</p>
                                <Link href={route('author', props.news.author_id)}>{props.news.author.name}</Link>
                            </div>
                        </div>
                        <div className='w-6/12 lg:w-3/12 mb-6'>
                            <p className='font-bold'>Category</p>
                            <CategoryList category={props.news.category} />
                            {/* <Link href={route('category', props.news.category_id)}>{props.news.category.title}</Link> */}
                        </div>
                        <div className='hidden lg:w-3/12 lg:flex'></div>
                        <div className='hidden lg:w-3/12 lg:flex'>
                            <div className='prose w-full mb-6 text-white' dangerouslySetInnerHTML={{ __html: props.news.subtitle }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative h-0 sm:mx-6 lg:mx-8'>
                <div className='absolute bottom-0 w-full'>
                    <img src={isValidUrl(props.news.media.url)} className='h-96 w-fit object-cover' />
                </div>
            </div>
            <div className='py-12'>
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className='prose w-full italic mb-6 pb-6 border-b-2 lg:hidden' dangerouslySetInnerHTML={{ __html: props.news.subtitle }} />
                    <div className='prose w-full' dangerouslySetInnerHTML={{ __html: props.news.content }} />
                </div>
            </div >
        </Unauthenticated >
    );
}
