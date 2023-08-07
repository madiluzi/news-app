import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from "react-apexcharts";
// import { ApexOptions } from "apexcharts";

export default function Dashboard(props) {
    const series = [
        {
            name: "Temperature in Fahrenheit", //will be displayed on the y-axis
            data: [43, 53, 50, 57]
        }
    ];
    const options = {
        chart: {
            id: "simple-bar"
        },
        xaxis: {
            categories: [1, 2, 3, 4] //will be displayed on the x-asis
        }
    };
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800" > Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="px-5 py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className='grid gap-4 mb-4 grid-cols-2'>
                        <div className='flex items-center px-3 py-5 overflow-hidden bg-white rounded-lg shadow-sm lg:px-6'>
                            <div className="flex items-center justify-center mr-4 rounded-full h-14 w-14 bg-red-50 dark:bg-red-800/20">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 stroke-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path></svg>
                            </div>
                            <div>
                                <p className='text-gray-500'>Published News</p>
                                <p className='text-2xl font-semibold text-gray-800 lg:text-3xl'>1233000</p>
                            </div>
                        </div>
                        <div className='flex items-center px-3 py-5 overflow-hidden bg-white rounded-lg shadow-sm lg:px-6'>
                            <div className="flex items-center justify-center mr-4 rounded-full h-14 w-14 bg-red-50 dark:bg-red-800/20">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" className="w-6 h-6 stroke-red-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path></svg>
                            </div>
                            <div>
                                <p className='text-gray-500'>Pending News</p>
                                <p className='text-2xl font-semibold text-gray-800 lg:text-3xl'>1233000</p>
                            </div>
                        </div>
                    </div>
                    {/* <Chart options={options} type="bar" series={series} width="100%" className="h-20" /> */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
