export default function SmallHeadline({ popular }) {
    return (
        <div className="px-4">
            <p className="font-semibold uppercase tracking-widest">Popular</p>
            {
                popular.data.map((news, index) =>
                    <div key={index} className="border-b border-gray-300 py-3">
                        <p className="font-semibold text-3xl">{news.title}</p>
                    </div >
                )
            }
        </div>
    );
}
