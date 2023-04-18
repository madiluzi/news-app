export const NewsItem = ({ news }) => {
    return (
        <div className="bg-white px-3 pt-3 pb-4 rounded-lg shadow-lg">
            <img src="https://dummyimage.com/400x300/000/fff" className="rounded-lg h-40 w-full object-cover mb-5" />
            <p className="text-neutral-500">{(new Date(news.created_at)).toDateString()}</p>
            <p className="text-neutral-800 text-xl mb-2 font-semibold line-clamp-3">{news.title}</p>
            {/* <p className="text-neutral-500 text-sm mb-4 line-clamp-4">{news.content}</p> */}
            <span className="px-3 py-1 bg-sky-200 text-sky-600 rounded-full font-semibold text-xs uppercase">Test</span>
        </div>
    )
}
