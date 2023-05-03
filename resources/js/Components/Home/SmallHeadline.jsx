import { Link } from "@inertiajs/react";

export default function SmallHeadline({ popular }) {
    return (
        <div className="px-6">
            <p className="font-semibold text-sm uppercase tracking-widest">Popular</p>
            {
                popular.data.map((news, index) =>
                    <Link key={index} href={route('article', news.id)}>
                        <div className="border-b border-gray-300 py-3">
                            <p className="font-semibold text-3xl line-clamp-3">{news.title}</p>
                        </div>
                    </Link>
                )
            }
        </div>
    );
}
