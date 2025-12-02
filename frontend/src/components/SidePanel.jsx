import React from 'react';

const SidePanel = ({ isPanelOpen, setIsPanelOpen, handleExport, handleImport }) => {
    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className="fixed top-5 left-5 z-50 p-2 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Sliding Panel */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 pt-20 flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Données</h2>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-gray-300">Exporter</h3>
                        <button
                            onClick={handleExport}
                            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger JSON
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-gray-300">Importer</h3>
                        <label className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer border border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Choisir un fichier
                            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                            Le fichier doit être au format JSON exporté précédemment.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidePanel;
