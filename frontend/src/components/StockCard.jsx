import React from 'react';

const StockCard = ({ stock, handleEdit, handleDelete }) => {
    const currency = stock.currency || 'EUR';

    return (
        <div className="bg-gray-800 p-4 mb-2.5 rounded-lg flex justify-between items-start shadow-sm hover:bg-gray-750 transition-colors">
            <div className="pr-2 flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-lg flex items-center gap-2 flex-wrap">
                            <strong className="text-indigo-400">{stock.name}</strong>
                            {stock.ticker && <span className="text-gray-400 text-sm">({stock.ticker})</span>}
                            <span className="text-gray-300 ml-1">({stock.percentage}%)</span>

                            {stock.strategy && (
                                <span className={`px-2 py-0.5 rounded text-xs font-bold text-white uppercase ${stock.strategy === 'etf' ? 'bg-green-500' :
                                    stock.strategy === 'holding' ? 'bg-blue-500' :
                                        stock.strategy === 'cash' ? 'bg-gray-400' :
                                            'bg-amber-500' // perso
                                    }`}>
                                    {stock.strategy}
                                </span>
                            )}
                        </div>

                        {!(stock.classifications || []).some(c => ['CASH', 'OPTIONS'].includes(c.toUpperCase())) && (
                            <div className="text-sm text-gray-400 mt-1 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1">
                                <span>PRU: <span className="text-white">{stock.averagePrice ? `${stock.averagePrice} ${currency}` : '-'}</span></span>
                                <span>Prix Actuel: <span className="text-white">{stock.currentPrice ? `${stock.currentPrice} ${currency}` : '-'}</span></span>
                                {stock.quantity && <span>Qté: <span className="text-white">{stock.quantity}</span></span>}
                            </div>
                        )}

                        {(stock.averagePrice && stock.currentPrice && !(stock.classifications || []).some(c => ['CASH', 'OPTIONS'].includes(c.toUpperCase()))) ? (
                            <div className="mt-2 text-sm font-medium">
                                <span className={`${((stock.currentPrice - stock.averagePrice) / stock.averagePrice) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    Perf: {(((stock.currentPrice - stock.averagePrice) / stock.averagePrice) * 100).toFixed(2)}%
                                </span>
                            </div>
                        ) : null}
                    </div>
                </div>
                <p className="text-sm text-gray-400 mt-2 italic border-l-2 border-gray-600 pl-2">{stock.thesis}</p>
                <div className="text-xs mt-2 flex flex-wrap gap-1">
                    {(stock.classifications || []).sort().map((c, i) => (
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
    );
};

export default StockCard;
