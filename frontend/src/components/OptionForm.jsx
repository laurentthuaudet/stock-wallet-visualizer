import React from 'react';

const OptionForm = ({ form, handleChange, handleSubmit, editingId, setEditingId, setForm }) => {

    const handleReset = () => {
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
        if (editingId) {
            setEditingId(null);
        }
    };

    return (
        <div className="p-8 bg-gray-900 rounded-2xl mb-10 shadow-lg border border-gray-800">
            <h2 className="text-2xl font-semibold mb-6 flex justify-between items-center">
                <span>{editingId ? 'Modifier l\'Option' : 'Ajouter une Option'}</span>
                {editingId && <span className="text-sm text-indigo-400">Mode Édition</span>}
            </h2>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
                {/* Row 1: Underlying, Premium, Quantity, Current Price */}
                <div className="flex flex-col md:flex-row gap-6">
                    <input
                        name="ticker"
                        placeholder="Ticker"
                        value={form.ticker}
                        onChange={handleChange}
                        required
                        className="w-24 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors uppercase"
                    />
                    <input
                        name="underlying"
                        placeholder="Sous-jacent (Nom)"
                        value={form.underlying}
                        onChange={handleChange}
                        required
                        className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <input
                        name="premium"
                        type="number"
                        placeholder="Prime"
                        value={form.premium}
                        onChange={handleChange}
                        required
                        className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <input
                        name="currentPrice"
                        type="number"
                        placeholder="Prix Actuel du Sous-jacent"
                        value={form.currentPrice}
                        onChange={handleChange}
                        className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <input
                        name="quantity"
                        type="number"
                        placeholder="Qté"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                        className="w-24 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors text-center"
                    />
                </div>

                {/* Row 2: Side, Direction, Strike, Expiration */}
                <div className="flex flex-col md:flex-row gap-6">
                    <select
                        name="side"
                        value={form.side}
                        onChange={handleChange}
                        className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                        <option value="ACHAT">ACHAT (Long)</option>
                        <option value="VENTE">VENTE (Short)</option>
                    </select>
                    <select
                        name="direction"
                        value={form.direction}
                        onChange={handleChange}
                        className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                        <option value="CALL">CALL</option>
                        <option value="PUT">PUT</option>
                    </select>
                    <input
                        name="strike"
                        type="number"
                        placeholder="Strike"
                        value={form.strike}
                        onChange={handleChange}
                        required
                        className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                    <input
                        name="expirationDate"
                        type="date"
                        placeholder="Date d'échéance"
                        value={form.expirationDate}
                        onChange={handleChange}
                        required
                        className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    />
                </div>

                <div className="mt-2 flex justify-center gap-4">
                    <button
                        type="submit"
                        className="px-8 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg transition-transform transform hover:scale-105"
                    >
                        {editingId ? 'Modifier l\'Option' : 'Ajouter l\'Option'}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="px-8 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 text-white font-bold shadow-lg transition-transform transform hover:scale-105"
                    >
                        {editingId ? 'Annuler' : 'Réinitialiser'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OptionForm;
