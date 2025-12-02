import React from 'react';

const StockList = ({ stocks, searchTerm, setSearchTerm, handleEdit, handleDelete }) => {
    return (
        <div className="text-left mt-5 pl-5 pr-5">
            <h2 className="text-2xl font-semibold mb-4 text-center">Liste des Actions</h2>

            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Rechercher une action..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md p-3 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
                />
            </div>

            {stocks.filter(stock => stock.name.toLowerCase().includes(searchTerm.toLowerCase())).map(stock => (
                <div key={stock._id} className="bg-gray-800 p-4 mb-2.5 rounded-lg flex justify-between items-center shadow-sm hover:bg-gray-750 transition-colors">
                    <div className="pr-2">
                        <div className="text-lg">
                            <strong className="text-indigo-400">{stock.name}</strong> <span className="text-gray-300">({stock.percentage}%)</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{stock.thesis}</p>
                        <div className="text-xs mt-2 flex flex-wrap gap-1">
                            {stock.classifications.sort().map((c, i) => (
                                <span key={i} className="bg-gray-700 px-2 py-0.5 rounded text-gray-300">
                                    {c}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-500 transition-colors text-sm font-medium"
                            onClick={() => handleEdit(stock)}
                        >
                            Modifier
                        </button>
                        <button
                            className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-400 transition-colors text-sm font-medium"
                            onClick={() => handleDelete(stock._id)}
                        >
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StockList;
