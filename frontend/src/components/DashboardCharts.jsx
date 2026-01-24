import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';

const DashboardCharts = ({ stocks, pieData, strategyPieData, barData, currencyPieData }) => {
    return (
        <>
            <h2 className="text-2xl font-semibold mb-4">Répartition des actions</h2>
            <div className="flex justify-around flex-wrap mt-10 gap-5">
                <div className="w-full md:w-[45%] min-w-[300px] bg-gray-800 p-5 rounded-xl mb-5 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Répartition par Action</h3>
                    {stocks.length > 0 ? (
                        <Pie
                            data={pieData}
                            options={{
                                plugins: {
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                const label = context.label || '';
                                                const value = context.raw;
                                                const dataset = context.chart.data.datasets[0];

                                                let total = 0;
                                                dataset.data.forEach((datapoint) => {
                                                    total += datapoint;
                                                });

                                                const percentage = ((value / total) * 100).toFixed(1) + '%';
                                                return `${label}: ${value} (${percentage})`;
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    ) : (
                        <p className="text-gray-400">Aucune donnée</p>
                    )}
                </div>
                <div className="w-full md:w-[45%] min-w-[300px] bg-gray-800 p-5 rounded-xl mb-5 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Répartition par Tags</h3>
                    {barData && barData.labels.length > 0 ? <Bar data={barData} /> : <p className="text-gray-400">Aucune donnée</p>}
                </div>
                <div className="w-full md:w-[45%] min-w-[300px] bg-gray-800 p-5 rounded-xl mb-5 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Répartition par Stratégie</h3>
                    {strategyPieData && strategyPieData.labels.length > 0 ? <Pie data={strategyPieData} /> : <p className="text-gray-400">Aucune donnée</p>}
                </div>
                <div className="w-full md:w-[45%] min-w-[300px] bg-gray-800 p-5 rounded-xl mb-5 shadow-md">
                    <h3 className="text-xl font-semibold mb-4">Répartition par Devise</h3>
                    {currencyPieData && currencyPieData.labels.length > 0 ? <Pie data={currencyPieData} /> : <p className="text-gray-400">Aucune donnée</p>}
                </div>
            </div>
        </>
    );
};

export default DashboardCharts;
