import React from 'react';

const StockForm = ({ form, handleChange, handleSubmit, editingId, setEditingId, setForm }) => {
    return (
        <div className="p-8 bg-gray-900 rounded-2xl mt-5">
            <h2 className="text-2xl font-semibold mb-4">Ajouter une Action</h2>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col gap-6">
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-4">
                        {/* Top Row: Name + Percentage */}
                        <div className="flex gap-4">
                            <input
                                name="name"
                                placeholder="Nom de l'action"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="flex-1 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <input
                                name="percentage"
                                type="number"
                                placeholder="%"
                                value={form.percentage}
                                onChange={handleChange}
                                required
                                className="w-20 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors text-center"
                            />
                        </div>
                        {/* Bottom Row: Classifications */}
                        <input
                            name="classifications"
                            placeholder="Classifications (séparées par virgule)"
                            value={form.classifications}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        />
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
                    {editingId && (
                        <button
                            type="button"
                            onClick={() => { setEditingId(null); setForm({ name: '', thesis: '', percentage: '', classifications: '' }); }}
                            className="px-6 py-2.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold transition-colors shadow-md"
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default StockForm;
