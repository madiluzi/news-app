import { Link } from "@inertiajs/react";

export default function CategoryList(props) {
    console.log('props.news', props)
    return (
        <>
            {
                props.category.map((category, index, row) =>
                    <Link href={route('category', category.id)}>{index + 1 === row.length ? category.title : category.title + ', '}</Link>
                )
            }
        </>
    );
}
