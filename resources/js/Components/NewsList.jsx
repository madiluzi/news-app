import { NewsItem } from "./NewsItem"

export const NewsList = ({ news }) => {
    console.log('news', news)
    return (
        <div className="grid grid-cols-3 gap-4">
            {
                news.data.map((item, key) =>
                    <NewsItem key={key} news={item} />
                )
            }
        </div>
    )
}
