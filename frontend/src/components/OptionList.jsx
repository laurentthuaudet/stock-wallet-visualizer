import React from 'react';
import OptionCard from './OptionCard';

const OptionList = ({ title, options, handleEdit, handleDelete, titleColorClass }) => {
    return (
        <div className="flex-1">
            <h2 className={`text-2xl font-bold mb-4 border-b border-gray-700 pb-2 ${titleColorClass}`}>
                {title}
            </h2>
            <div className="flex flex-col gap-4">
                {options.length === 0 && <p className="text-gray-500 italic">Aucune position.</p>}
                {options.map(option => (
                    <OptionCard
                        key={option._id}
                        option={option}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default OptionList;
