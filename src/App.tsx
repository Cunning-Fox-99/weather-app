import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SavedUsers from './pages/SavedUsers';
import './App.scss';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/saved">Saved Users</Link>
            </nav>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/saved" element={<SavedUsers />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
