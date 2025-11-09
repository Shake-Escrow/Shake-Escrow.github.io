import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Layout components
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';

// Pages
import Home from './pages/home';
import HowItWorks from './pages/howitworks';
import GetPaid from './pages/getpaid';
import SendPayments from './pages/sendpayments';
import FAQ from './pages/faq';
import PrivacyPolicy from './pages/privacy-policy';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { search, pathname } = location;
    if (pathname === '/' && search.startsWith('?/' )) {
      // Extract the path from the query (e.g., '?/how-it-works' → '/how-it-works')
      const targetPath = search.slice(2); // Remove '?/' prefix
      navigate(targetPath, { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/get-paid" element={<GetPaid />} />
          <Route path="/send-payments" element={<SendPayments />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  // For custom domain or user pages (username.github.io), basename is always '/'
  const basename = '/';
  
  return (
    <Router basename={basename}>
      <AppContent />
    </Router>
  );
}

export default App;