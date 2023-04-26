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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight" > Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Chart options={options} type="bar" series={series} width="80%" />
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
