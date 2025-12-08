import React from 'react';
import OptionPayoffChart from './OptionPayoffChart';

const OptionCard = ({ option, handleEdit, handleDelete }) => {
    return (
        <div className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 relative group hover:border-purple-500/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div className="cursor-pointer flex-1" onClick={() => handleEdit(option)}>
                    <h3 className="text-xl font-bold text-white hover:text-purple-400 transition-colors mb-2 text-left">{option.underlying}</h3>

                    {/* Line 1: Type & Date */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${option.direction === 'CALL' ? 'bg-blue-600/30 text-blue-400' : 'bg-orange-600/30 text-orange-400'}`}>
                            {option.direction}
                        </span>

                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-700 text-gray-300">
                            {new Date(option.expirationDate).toLocaleDateString()}
                        </span>
                    </div>

                    {/* Line 2: Prices */}
                    <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-900/40 text-purple-300 border border-purple-700/50">
                            Strike: {option.strike} €
                        </span>

                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-teal-900/40 text-teal-300 border border-teal-700/50">
                            Prime: {option.premium} €
                        </span>

                        {option.currentPrice > 0 && (
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-yellow-900/40 text-yellow-300 border border-yellow-700/50">
                                Actuel: {option.currentPrice} €
                            </span>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => handleDelete(option._id)}
                    className="text-red-400 hover:text-red-300 transition-colors ml-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>

            {/* Chart Area */}
            <div className="h-40 w-full mt-4 bg-gray-900/50 rounded-lg p-2">
                <OptionPayoffChart option={option} />
            </div>

            {/* Tooltip hint */}
            <div className="absolute top-2 right-12 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Cliquer pour modifier
            </div>
        </div>
    );
};

export default OptionCard;
