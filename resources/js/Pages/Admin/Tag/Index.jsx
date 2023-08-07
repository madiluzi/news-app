import Badge from '@/Components/Badge';
import { Pagination } from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function Index(props) {
    const { delete: destroy } = useForm()

    function handleDelete(e) {
        e.preventDefault()
        destroy(route("tag.destroy", e.target.id));
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tag</h2>}
        >
            <Head title="Tag" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Link href={route("tag.create")} type="button"
                        className="inline-block items-center px-4 py-2 mb-6 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                        Add Item</Link>
                    <div className="relative overflow-x-auto mb-6">
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
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.tags.data.map((item, key) =>
                                        <tr key={key} className="bg-white border-b">
                                            <td className="px-6 py-4">{key + 1}</td>
                                            <td className="px-6 py-4">{item.title}</td>
                                            <td className="px-6 py-4"><Badge status={item.status} /></td>
                                            <td className="px-6 py-4">
                                                <div className='h-full flex gap-2 items-center justify-end'>
                                                    <Link href={route(`tag.edit`, item.id)}
                                                        className="px-2 py-2 inline-block text-yellow-500 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-500 focus:bg-yellow-500 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 hover:text-white focus:text-white active:text-white focus:ring-offset-2 transition ease-in-out duration-150">
                                                        <IconEdit className='w-4 h-4' />
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
                            </tbody>
                        </table>
                    </div>
                    <Pagination meta={props.tags.meta} />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
