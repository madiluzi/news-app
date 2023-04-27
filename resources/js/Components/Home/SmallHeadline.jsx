export default function SmallHeadline({ popular }) {
    return (
        <div className="px-6">
            <p className="font-semibold text-sm uppercase tracking-widest">Popular</p>
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
