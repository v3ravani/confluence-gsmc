import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './sections/Header/Header';
import Footer from './sections/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Event from './pages/Event';
import Workshop from './pages/Workshop';
import Merchandise from './pages/Merchandise';
import CME from './pages/CME';
import Contact from './pages/Contact';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen text-[var(--ink-2)] bg-[var(--bg-canvas)]">
      <Header />
      <main className="flex-1 relative">
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/events"     element={<Event />} />
          <Route path="/workshops"  element={<Workshop />} />
          <Route path="/merchandise"element={<Merchandise />} />
          <Route path="/cme"        element={<CME />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="*"           element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
