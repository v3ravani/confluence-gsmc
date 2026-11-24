import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/common/CustomCursor';
import SplashScreen from './components/common/SplashScreen';
import Header from './sections/Header/Header';
import Footer from './sections/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Event from './pages/Event';
import Workshop from './pages/Workshop';
import Merchandise from './pages/Merchandise';
import CME from './pages/CME';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import ConferenceCountdown from './components/common/ConferenceCountdown';
import { trackPageView } from './utils/analytics';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Record pageview and visitor analytics in Firebase RTDB
    trackPageView();
  }, []);

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      <div className="flex flex-col min-h-screen text-[var(--ink-2)] bg-[var(--bg-canvas)]">
        <Header />
        <main className="flex-1 relative">
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/about"      element={<About />} />
            <Route path="/events"     element={<Event />} />
            <Route path="/workshops"  element={<Workshop />} />
            <Route path="/workshop"   element={<Workshop />} />
            <Route path="/merchandise"element={<Merchandise />} />
            <Route path="/cme"        element={<CME />} />
            <Route path="/gallery"    element={<Gallery />} />
            <Route path="/team"       element={<Team />} />
            <Route path="/brochures/CONFLUENCE_2026_Event_Brochure.pdf" element={<ExternalRedirect to="https://drive.google.com/file/d/1swkk2Ww2SAD7xfd-eDuvedXYpCMqrsPu/view?usp=drive_link" />} />
            <Route path="/brochures/CONFLUENCE_2026_CME_Brochure.pdf" element={<ExternalRedirect to="https://drive.google.com/file/d/1ZjMYzMSjzZtoGfEfaPvKtIXjVpn-lyQy/view?usp=drive_link" />} />
            <Route path="/brochures/CONFLUENCE_2026_Workshop_Brochure.pdf" element={<ExternalRedirect to="https://drive.google.com/file/d/1l3E0v7xOKJ3G6-YDee1fDSn0dBxrn2FW/view?usp=drive_link" />} />
            <Route path="/brochures"  element={<ExternalRedirect to="https://drive.google.com/file/d/1swkk2Ww2SAD7xfd-eDuvedXYpCMqrsPu/view?usp=drive_link" />} />
            <Route path="/brochure"   element={<ExternalRedirect to="https://drive.google.com/file/d/1swkk2Ww2SAD7xfd-eDuvedXYpCMqrsPu/view?usp=drive_link" />} />
            <Route path="*"           element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ConferenceCountdown />
    </>
  );
}
