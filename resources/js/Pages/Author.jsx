import Unauthenticated from "@/Layouts/UnauthenticatedLayout";
import { NewsItem } from "@/Components/NewsItem";
import { Head } from "@inertiajs/react";

export default function Author(props) {
    console.log(props)
    return (
        <Unauthenticated
            auth={props.auth}
        >
            <Head title={props.news.data[0].author.name} />
            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className='max-w-5xl mx-auto'>
                        <p className="px-3 mb-6 font-semibold text-3xl">{props.news.data[0].author.name}</p>
                        <div className="px-2 lg:px-0 grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                            {
                                props.news.data.map((item, key) =>
                                    <NewsItem key={key} news={item} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Unauthenticated>
    )
}
