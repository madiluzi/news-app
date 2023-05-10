import { NewsItem } from "./NewsItem"

export const NewsList = ({ news }) => {
    console.log('news', news)
    return (
        <div className="px-2 lg:px-0 grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {
                news.data.map((item, key) =>
                    <NewsItem key={key} news={item} />
                )
            }
        </div>
    )
}
