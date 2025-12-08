import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const OptionPayoffChart = ({ option }) => {
    const { direction, side, strike, premium, quantity, currentPrice } = option;

    // Generate data points
    // Center logic: strictly prefer currentPrice if > 0, else strike
    const centerPrice = currentPrice > 0 ? parseFloat(currentPrice) : parseFloat(strike);

    // Define range width based on centering price (e.g., +/- 40%)
    const rangePercent = 0.4;
    const minPrice = centerPrice * (1 - rangePercent);
    const maxPrice = centerPrice * (1 + rangePercent);
    // Use strictly linear step
    const step = (maxPrice - minPrice) / 100;

    const dataPoints = [];
    let minProfit = Infinity;
    let maxProfit = -Infinity;

    for (let price = minPrice; price <= maxPrice; price += step) {
        let profit = 0;

        if (direction === 'CALL') {
            if (side === 'ACHAT') {
                profit = Math.max(price - strike, 0) - premium;
            } else {
                profit = premium - Math.max(price - strike, 0);
            }
        } else {
            if (side === 'ACHAT') {
                profit = Math.max(strike - price, 0) - premium;
            } else {
                profit = premium - Math.max(strike - price, 0);
            }
        }

        profit *= quantity;
        dataPoints.push({ x: price, y: profit });
        if (profit < minProfit) minProfit = profit;
        if (profit > maxProfit) maxProfit = profit;
    }

    const datasets = [
        {
            label: 'Payoff',
            data: dataPoints,
            borderColor: 'rgba(255, 255, 255, 0.9)',
            borderWidth: 2,
            pointRadius: 0,
            fill: {
                target: 'origin',
                above: 'rgba(74, 222, 128, 0.3)',   // Green
                below: 'rgba(248, 113, 113, 0.3)'   // Red
            },
            tension: 0.1,
            order: 2
        }
    ];

    if (currentPrice > 0) {
        // Safe defaults if profit calcs failed (e.g. invalid data)
        const safeMin = minProfit !== Infinity ? minProfit : -100;
        const safeMax = maxProfit !== -Infinity ? maxProfit : 100;
        const padding = (safeMax - safeMin) * 0.1 || 10;

        datasets.push({
            label: 'Prix Actuel',
            data: [
                { x: currentPrice, y: safeMin - padding },
                { x: currentPrice, y: safeMax + padding }
            ],
            borderColor: 'rgb(250, 204, 21)', // Yellow
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            order: 1
        });
    }

    const data = { datasets };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
                mode: 'nearest',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label || 'P&L'}: ${context.parsed.y.toFixed(2)} €`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                display: true,
                title: { display: true, text: 'Prix Sous-jacent', color: '#9ca3af' },
                grid: { color: 'rgba(75, 85, 99, 0.2)' },
                ticks: { color: '#9ca3af' }
            },
            y: {
                display: true,
                title: { display: true, text: 'P&L (€)', color: '#9ca3af' },
                grid: { color: 'rgba(75, 85, 99, 0.2)' },
                ticks: { color: '#9ca3af' }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return <Line options={options} data={data} />;
};

export default OptionPayoffChart;
