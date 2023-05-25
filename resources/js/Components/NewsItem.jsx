import { Link } from "@inertiajs/react"

export const NewsItem = (props) => {
    console.log('NewsItem', props.news)
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return url;
        } catch (e) {
            return '/storage/' + url;
        }
    }
    // const imageUrl = (props.news.media) ? props.news.media.url : `https://picsum.photos/400/500?random=${props.news.id}`;
    return (
        <div className="pt-3 pb-4">
            <Link href={route('article', props.news.id)}>
                <img src={isValidUrl(props.news.media.url)} className="rounded-lg h-40 w-full object-cover mb-5" />
            </Link>
            <Link href={route('category', props.category ? props.category.title : props.news.category[0].id)} className="inline text-neutral-500 hover:text-neutral-900 transition duration-300">
                {props.category ? props.category.title : props.news.category[0].title}
            </Link>
            <p className="text-sm lg:text-base inline text-neutral-500"> - {(new Date(props.news.created_at)).toLocaleDateString()}</p>
            <Link href={route('article', props.news.id)}>
                <p className="text-neutral-800 text-base lg:text-xl mb-2 font-semibold line-clamp-2 lg:line-clamp-3">{props.news.title}</p>
                <Link href={route('author', props.news.author_id)} className="flex items-center">
                    <img src={isValidUrl(props.news.author.image)} className="w-7 h-7 rounded-full mr-2" />
                    <p className="text-sm lg:text-base text-gray-700">{props.news.author.name}</p>
                </Link>
            </Link>
            {/* <p className="text-neutral-500 text-sm mb-4 line-clamp-4">{props.news.content}</p> */}
        </div>
    )
}
