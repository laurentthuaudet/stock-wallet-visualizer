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
        thesis: '',
        percentage: '',
        classifications: '',
        averagePrice: '',
        currentPrice: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/stocks`);
            setStocks(res.data.sort((a, b) => b.percentage - a.percentage || a.name.localeCompare(b.name)));
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
            percentage: Number(form.percentage),
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
            setForm({ name: '', thesis: '', percentage: '', classifications: '', averagePrice: '', currentPrice: '' });
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
            thesis: stock.thesis,
            percentage: stock.percentage,
            classifications: stock.classifications.join(', '),
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
        stock.classifications.forEach(cls => {
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
            />

            <DashboardCharts
                stocks={stocks}
                classificationWeights={classificationWeights}
                pieData={pieData}
                barData={barData}
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
