import Badge from '@/Components/Badge';
import { Pagination } from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconId } from '@tabler/icons-react';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function Index(props) {
    const { delete: destroy } = useForm()

    function handleDelete(e) {
        e.preventDefault()
        destroy(route("news.destroy", e.target.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">News</h2>}
        >
            <Head title="News" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Link href={route("news.create")} type="button"
                        className="items-center inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add Item</Link>
                    <div className="relative mb-6 overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Content
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3">
                                        Image
                                    </th> */}
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tag
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Author
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.news.data.map((item, key) => {
                                        return (
                                            <tr key={item.id} className="bg-white border-b">
                                                <td className="px-6 py-4">{key + 1}</td>
                                                <td className="px-6 py-4">{item.title}</td>
                                                {/* <td className="px-6 py-4">{item.content}</td> */}
                                                <td className="px-6 py-4">
                                                    <div className='prose-sm prose text-gray-500 line-clamp-5' dangerouslySetInnerHTML={{ __html: item.content }} />
                                                </td>
                                                {/* <td className="px-6 py-4">
                                                    <img src={window.location.origin + '/uploads/' + item.image} className='object-cover w-full h-20' />
                                                </td> */}
                                                <td className="px-6 py-4">
                                                    {
                                                        item.category.map((category, index, row) =>
                                                            <span>{index + 1 === row.length ? category.title : category.title + ', '}</span>
                                                        )
                                                    }
                                                </td>
                                                {/* <td className="px-6 py-4">{item.category.title}</td> */}
                                                <td className="px-6 py-4">{item.tag.title}</td>
                                                <td className="px-6 py-4">{item.author.name}</td>
                                                <td className="px-6 py-4"><Badge status={item.status} /></td>
                                                <td className="px-6 py-4">
                                                    <div className='h-full flex gap-2 items-center justify-end'>
                                                        <Link href={route(`news.edit`, item.id)}
                                                            className="px-2 py-2 inline-block text-yellow-500 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-500 focus:bg-yellow-500 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:text-white focus:text-white active:text-white focus:ring-offset-2 transition ease-in-out duration-150">
                                                            <IconEdit className='w-4 h-4' />
                                                        </Link>
                                                        <Link href={route(`article`, item.id)}
                                                            className="px-2 py-2 inline-block text-sky-500 bg-sky-100 border border-transparent rounded-md hover:bg-sky-500 focus:bg-sky-500 active:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:text-white focus:text-white active:text-white focus:ring-offset-2 transition ease-in-out duration-150">
                                                            <IconId className='w-4 h-4' />
                                                        </Link>
                                                        <button onClick={handleDelete}
                                                            id={item.id}
                                                            className="px-2 py-2 inline-block text-red-500 bg-red-100 border border-transparent rounded-md hover:bg-red-500 focus:bg-red-500 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 hover:text-white focus:text-white active:text-white focus:ring-offset-2 transition ease-in-out duration-150">
                                                            <IconTrash className='w-4 h-4' />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <Pagination meta={props.news.meta} />
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
