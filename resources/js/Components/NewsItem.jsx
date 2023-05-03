import { Link } from "@inertiajs/react"

export const NewsItem = ({ news }) => {
    const imageUrl = (news.media) ? news.media.url : `https://picsum.photos/400/500?random=${news.id}`;
    return (
        <Link href={route('article', news.id)} className="px-3 pt-3 pb-4" >
            <img src={`https://picsum.photos/400/500?random=${news.id}`} className="rounded-lg h-40 w-full object-cover mb-5" />
            <p className="inline text-neutral-500">{news.category.title} - </p>
            <p className="inline text-neutral-500">{(new Date(news.created_at)).toDateString()}</p>
            <p className="text-neutral-800 text-xl mb-2 font-semibold line-clamp-3">{news.title}</p>
            <div className="flex items-center">
                <img src={imageUrl} className="w-7 h-7 rounded-full mr-2" />
                <p className="text-gray-700 text-sm">{news.author}</p>
            </div>
            {/* <p className="text-neutral-500 text-sm mb-4 line-clamp-4">{news.content}</p> */}
        </Link>
    )
}
