import React from 'react';

const StockForm = ({ form, handleChange, handleSubmit, editingId, setEditingId, setForm }) => {
    return (
        <div className="p-8 bg-gray-900 rounded-2xl mt-5">
            <h2 className="text-2xl font-semibold mb-4">Ajouter une Action</h2>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col gap-6">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Top Row: Name + Currency */}
                        <div className="flex gap-4">
                            <input
                                name="ticker"
                                placeholder="Ticker (Symbol)"
                                value={form.ticker}
                                onChange={handleChange}
                                className="w-40 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors uppercase"
                            />
                            <input
                                name="name"
                                placeholder="Nom de l'action"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <select
                                name="currency"
                                value={form.currency}
                                onChange={handleChange}
                                className="w-24 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            >
                                <option value="EUR">EUR</option>
                                <option value="USD">USD</option>
                                <option value="JPY">JPY</option>
                                <option value="NOK">NOK</option>
                                <option value="SEK">SEK</option>
                                <option value="AUD">AUD</option>
                                <option value="CAD">CAD</option>
                            </select>
                        </div>

                        {/* Financial Info & details Row */}
                        <div className="flex gap-4">
                            <input
                                name="quantity"
                                type="number"
                                placeholder="Qté"
                                value={form.quantity}
                                onChange={handleChange}
                                required
                                className="w-24 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors text-center"
                            />
                            <input
                                name="averagePrice"
                                type="number"
                                placeholder="PRU"
                                value={form.averagePrice}
                                onChange={handleChange}
                                className="w-52 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <input
                                name="currentPrice"
                                type="number"
                                placeholder="Prix Actuel"
                                value={form.currentPrice}
                                onChange={handleChange}
                                className="w-52 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <select
                                name="strategy"
                                value={form.strategy}
                                onChange={handleChange}
                                className="w-32 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            >
                                <option value="perso">Perso</option>
                                <option value="etf">ETF</option>
                                <option value="holding">Holding</option>
                                <option value="cash">Cash</option>
                            </select>
                            <input
                                name="classifications"
                                placeholder="Tags"
                                value={form.classifications}
                                onChange={handleChange}
                                className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                        </div>

                    </div>

                    {/* Right Column: Thesis */}
                    <div className="flex-1">
                        <textarea
                            name="thesis"
                            placeholder="Thèse (ex: Pour les enfants de 10 ans)"
                            value={form.thesis}
                            onChange={handleChange}
                            required
                            className="w-full h-full min-h-[120px] p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-center gap-4">
                    <button
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors shadow-md"
                    >
                        {editingId ? 'Modifier l\'action' : 'Ajouter l\'action'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setEditingId(null); setForm({ name: '', ticker: '', thesis: '', quantity: '', currency: 'EUR', classifications: '', averagePrice: '', currentPrice: '' }); }}
                        className="px-6 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors shadow-md"
                    >
                        {editingId ? 'Annuler' : 'Réinitialiser'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StockForm;
