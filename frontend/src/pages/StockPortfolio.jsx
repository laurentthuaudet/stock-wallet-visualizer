import { useState, useEffect } from 'react'
import axios from 'axios'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import SidePanel from '../components/SidePanel';
import StockForm from '../components/StockForm';
import DashboardCharts from '../components/DashboardCharts';
import StockList from '../components/StockList';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const StockPortfolio = () => {
    const [stocks, setStocks] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({
        name: '',
        ticker: '',
        thesis: '',
        quantity: '',
        currency: 'EUR',
        strategy: 'perso',
        classifications: '',
        averagePrice: '',
        currentPrice: ''
    });


    const [searchTerm, setSearchTerm] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const [exchangeRates, setExchangeRates] = useState({
        EUR: 1,
        USD: 1.05,
        JPY: 158,
        NOK: 11.75,
        SEK: 11.35,
        AUD: 1.63,
        CAD: 1.50
    });
    const [isRatesLoaded, setIsRatesLoaded] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Load Stocks and Rates on Mount
    useEffect(() => {
        const loadData = async () => {
            await fetchRates(); // Fetch rates FIRST
            // fetchStocks will be called by the dependency on exchangeRates when it updates
        };
        loadData();
    }, []);

    // Fetch Stocks whenever rates change (to recalculate values)
    useEffect(() => {
        if (isRatesLoaded) {
            fetchStocks();
            saveRatesDebounced();
        }
    }, [exchangeRates]);

    const fetchRates = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/exchange-rates`);
            if (res.data && Object.keys(res.data).length > 0) {
                setExchangeRates(prev => ({ ...prev, ...res.data }));
            }
            setIsRatesLoaded(true);
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            setIsRatesLoaded(true); // Proceed anyway
        }
    };

    const saveRatesDebounced = () => {
        const handler = setTimeout(async () => {
            try {
                await axios.post(`${API_URL}/api/exchange-rates`, exchangeRates);
            } catch (error) {
                console.error("Error saving rates:", error);
            }
        }, 1000); // 1 sec debounce
        return () => clearTimeout(handler);
    };

    const fetchStocks = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/stocks`);
            const rawStocks = res.data;

            const totalValue = rawStocks.reduce((sum, stock) => {
                const currency = stock.currency || 'EUR';
                const rate = exchangeRates[currency] || 1;
                const valueInEur = ((stock.quantity || 0) * (stock.currentPrice || stock.averagePrice || 0)) / rate;
                return sum + valueInEur;
            }, 0);

            const stocksWithPercentage = rawStocks.map(stock => {
                const currency = stock.currency || 'EUR';
                const rate = exchangeRates[currency] || 1;
                const valueInEur = ((stock.quantity || 0) * (stock.currentPrice || stock.averagePrice || 0)) / rate;

                return {
                    ...stock,
                    // If totalValue is 0 (empty portfolio), percentage is 0.
                    percentage: totalValue > 0 ? Number((valueInEur / totalValue * 100).toFixed(2)) : 0
                };
            });

            setStocks(stocksWithPercentage.sort((a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name)));
        } catch (error) {
            console.error("Error fetching stocks:", error);
        }
    };


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const classificationsArray = form.classifications.split(',').map(c => c.trim()).filter(c => c);
        const newStock = {
            ...form,
            quantity: Number(form.quantity),
            averagePrice: Number(form.averagePrice),
            currentPrice: Number(form.currentPrice),
            classifications: classificationsArray
        };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/api/stocks/${editingId}`, newStock);
                setEditingId(null);
            } else {
                await axios.post(`${API_URL}/api/stocks`, newStock);
            }
            setForm({ name: '', ticker: '', thesis: '', quantity: '', currency: 'EUR', strategy: 'perso', classifications: '', averagePrice: '', currentPrice: '' });
            fetchStocks();
        } catch (error) {
            console.error("Error saving stock:", error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Une erreur est survenue lors de l'enregistrement.");
            }
        }
    };

    const handleEdit = (stock) => {
        setForm({
            name: stock.name,
            ticker: stock.ticker,
            thesis: stock.thesis,
            quantity: stock.quantity || '',
            currency: stock.currency || 'EUR',
            strategy: stock.strategy || 'perso',
            classifications: (stock.classifications || []).join(', '),
            averagePrice: stock.averagePrice || '',
            currentPrice: stock.currentPrice || ''
        });
        setEditingId(stock._id);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/stocks/${id}`);
            fetchStocks();
        } catch (error) {
            console.error("Error deleting stock:", error);
        }
    };

    const handleExport = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(stocks)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "portfolio_data.json";
        link.click();
    };

    const handleImport = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = async (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData)) {
                    for (const item of importedData) {
                        const { _id, ...stockData } = item;
                        try {
                            await axios.post(`${API_URL}/api/stocks`, stockData);
                        } catch (err) {
                            console.warn(`Skipping duplicate or invalid stock: ${stockData.name}`);
                        }
                    }
                    fetchStocks();
                    alert('Import terminé !');
                } else {
                    alert('Format de fichier invalide (doit être un tableau JSON).');
                }
            } catch (error) {
                console.error("Erreur lors de l'import:", error);
                alert("Erreur lors de l'import du fichier.");
            }
        };
    };

    // Prepare Chart Data
    const pieData = {
        labels: stocks.map(s => s.name),
        datasets: [
            {
                data: stocks.map(s => s.percentage),
                backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#E7E9ED', '#76A346', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1',
                    '#4D5360', '#AC64AD', '#F49AC2', '#77DD77', '#FFB347', '#CFCFC4',
                    '#B39EB5', '#FF6961'
                ],
                hoverBackgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#E7E9ED', '#76A346', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1',
                    '#4D5360', '#AC64AD', '#F49AC2', '#77DD77', '#FFB347', '#CFCFC4',
                    '#B39EB5', '#FF6961'
                ]
            }
        ]
    };

    // Calculate Classification Weights
    const classificationWeights = {};
    stocks.forEach(stock => {
        (stock.classifications || []).forEach(cls => {
            if (!classificationWeights[cls]) {
                classificationWeights[cls] = 0;
            }
            classificationWeights[cls] += stock.percentage;
        });
    });

    const sortedClassifications = Object.keys(classificationWeights).sort();

    const barData = {
        labels: sortedClassifications,
        datasets: [
            {
                label: 'Poids par Classification (%)',
                data: sortedClassifications.map(c => classificationWeights[c]),
                backgroundColor: '#36A2EB',
            }
        ]
    };

    // Calculate Strategy Weights
    const strategyColors = {
        'etf': '#10B981', // green-500
        'holding': '#3B82F6', // blue-500
        'perso': '#F59E0B',  // amber-500
        'cash': '#9CA3AF' // gray-400
    };

    const strategyWeights = {};
    stocks.forEach(stock => {
        const strategy = stock.strategy || 'perso'; // Default to 'perso'
        if (!strategyWeights[strategy]) {
            strategyWeights[strategy] = 0;
        }
        strategyWeights[strategy] += stock.percentage;
    });

    const strategyLabels = Object.keys(strategyWeights);
    const strategyPieData = {
        labels: strategyLabels,
        datasets: [
            {
                data: strategyLabels.map(key => strategyWeights[key]),
                backgroundColor: strategyLabels.map(key => strategyColors[key] || '#949FB1'),
                hoverBackgroundColor: strategyLabels.map(key => strategyColors[key] || '#949FB1')
            }
        ]
    };

    // Calculate Currency Weights
    const currencyWeights = {};
    stocks.forEach(stock => {
        const currency = stock.currency || 'EUR';
        if (!currencyWeights[currency]) {
            currencyWeights[currency] = 0;
        }
        currencyWeights[currency] += stock.percentage;
    });

    const currencyPieData = {
        labels: Object.keys(currencyWeights),
        datasets: [
            {
                data: Object.keys(currencyWeights).map(key => currencyWeights[key]),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#E7E9ED', '#76A346', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
                    '#E7E9ED', '#76A346', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1']
            }
        ]
    };

    return (
        <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-8">
                Portefeuille Boursier
            </h1>

            <SidePanel
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                handleExport={handleExport}
                handleImport={handleImport}
                exchangeRates={exchangeRates}
                setExchangeRates={setExchangeRates}
            />

            <DashboardCharts
                stocks={stocks}
                pieData={pieData}
                barData={barData}
                strategyPieData={strategyPieData}
                currencyPieData={currencyPieData}
            />

            <StockList
                stocks={stocks}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

            <StockForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editingId={editingId}
                setEditingId={setEditingId}
                setForm={setForm}
            />
        </div>
    )
}

export default StockPortfolio;
