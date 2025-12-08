import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StockPortfolio from './pages/StockPortfolio';
import OptionPortfolio from './pages/OptionPortfolio';
import './index.css';

function App() {
    return (
        <Router>
            <div className="App min-h-screen bg-gray-900 text-white font-sans">
                {/* Navigation Bar */}
                <nav className="bg-gray-800 border-b border-gray-700 p-4 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto flex justify-center gap-8">
                        <Link
                            to="/"
                            className="text-lg font-semibold hover:text-indigo-400 transition-colors"
                        >
                            Actions
                        </Link>
                        <Link
                            to="/options"
                            className="text-lg font-semibold hover:text-indigo-400 transition-colors"
                        >
                            Options
                        </Link>
                    </div>
                </nav>

                {/* Page Content */}
                <div className="container mx-auto p-4 pt-8">
                    <Routes>
                        <Route path="/" element={<StockPortfolio />} />
                        <Route path="/options" element={<OptionPortfolio />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
