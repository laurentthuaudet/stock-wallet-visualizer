import React from 'react';
import StockCard from './StockCard';

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
                <StockCard
                    key={stock._id}
                    stock={stock}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default StockList;
