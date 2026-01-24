import { useState, useEffect } from 'react';
import axios from 'axios';
import OptionForm from '../components/OptionForm';
import OptionList from '../components/OptionList';

const OptionPortfolio = () => {
    const [options, setOptions] = useState([]);
    const [form, setForm] = useState({
        ticker: '',
        underlying: '',
        direction: 'CALL', // CALL or PUT
        side: 'ACHAT', // ACHAT or VENTE
        strike: '',
        expirationDate: '',
        premium: '',
        quantity: '1',
        currentPrice: ''
    });
    const [editingId, setEditingId] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchOptions();
    }, []);

    const fetchOptions = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/options`);
            setOptions(res.data);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newOption = {
            ...form,
            strike: Number(form.strike),
            premium: Number(form.premium),
            quantity: Number(form.quantity),
            currentPrice: Number(form.currentPrice)
        };

        try {
            if (editingId) {
                await axios.put(`${API_URL}/api/options/${editingId}`, newOption);
                setEditingId(null);
            } else {
                await axios.post(`${API_URL}/api/options`, newOption);
            }
            setForm({
                ticker: '',
                underlying: '',
                direction: 'CALL',
                side: 'ACHAT',
                strike: '',
                expirationDate: '',
                premium: '',
                quantity: '1',
                currentPrice: ''
            });
            fetchOptions();
        } catch (error) {
            console.error("Error saving option:", error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Une erreur est survenue lors de l'enregistrement.");
            }
        }
    };

    const handleEdit = (option) => {
        setForm({
            ticker: option.ticker || '',
            underlying: option.underlying,
            direction: option.direction,
            side: option.side,
            strike: option.strike,
            expirationDate: option.expirationDate ? new Date(option.expirationDate).toISOString().split('T')[0] : '',
            premium: option.premium,
            quantity: option.quantity,
            currentPrice: option.currentPrice || ''
        });
        setEditingId(option._id);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/options/${id}`);
            fetchOptions();
        } catch (error) {
            console.error("Error deleting option:", error);
        }
    };

    const buys = options
        .filter(o => o.side === 'ACHAT')
        .sort((a, b) => a.underlying.localeCompare(b.underlying));

    const sells = options
        .filter(o => o.side === 'VENTE')
        .sort((a, b) => a.underlying.localeCompare(b.underlying));

    return (
        <div className="pb-10">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-8">
                Portefeuille Options
            </h1>

            {/* Lists */}
            <div className="flex flex-col lg:flex-row gap-8 mb-10">
                <OptionList
                    title="Positions Achat (Long)"
                    options={buys}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    titleColorClass="text-green-400"
                />

                <OptionList
                    title="Positions Vente (Short)"
                    options={sells}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    titleColorClass="text-red-400"
                />
            </div>

            {/* Form - Moved to bottom */}
            <OptionForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                editingId={editingId}
                setEditingId={setEditingId}
                setForm={setForm}
            />
        </div>
    );
};

export default OptionPortfolio;
