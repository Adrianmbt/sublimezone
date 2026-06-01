import React, { useState } from 'react';
import { Menu, X, Bot, Store, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

export default function Navbar({ activeTab, setActiveTab, botConnected, whatsappPhone }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setActiveTab('landing');
    setMobileMenuOpen(false);
    
    // Smooth scroll delay to ensure tab changes first if we are on dashboard
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="fixed top-0 w-full z-50 glass shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-16 py-4 max-w-[1280px] mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
            <span className="text-xl font-display">S</span>
          </div>
          <div>
            <span className="font-display font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Sublime
            </span>
            <span className="text-xs block -mt-1 font-body text-on-surface-variant font-medium">Personalizados</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('mugs')}
            className={`font-body text-sm font-semibold transition-all duration-200 ${
              activeTab === 'landing' ? 'text-on-surface hover:text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Mugs
          </button>
          <button 
            onClick={() => handleNavClick('tshirts')}
            className={`font-body text-sm font-semibold transition-all duration-200 ${
              activeTab === 'landing' ? 'text-on-surface hover:text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Textil
          </button>
          <button 
            onClick={() => handleNavClick('corporate')}
            className={`font-body text-sm font-semibold transition-all duration-200 ${
              activeTab === 'landing' ? 'text-on-surface hover:text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Corporativo
          </button>
          <button 
            onClick={() => handleNavClick('why-us')}
            className={`font-body text-sm font-semibold transition-all duration-200 ${
              activeTab === 'landing' ? 'text-on-surface hover:text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Beneficios
          </button>
        </nav>

        {/* Tab Selector Buttons & Status */}
        <div className="hidden md:flex items-center gap-4">
          {/* Landing Switcher */}
          <button
            onClick={() => setActiveTab('landing')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'landing'
                ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[0.98]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <Store size={16} />
            Tienda
          </button>

          {botConnected && (
            <button
              type="button"
              onClick={() => openWhatsApp(whatsappPhone, 'Hola Sublime Personalizados, quiero más información.')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <MessageCircle size={16} />
              WhatsApp
            </button>
          )}

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold relative transition-all duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-secondary text-white shadow-lg shadow-secondary/20 scale-[0.98]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <Bot size={16} />
            Configurar Bot
            
            {/* Status dot */}
            <span className="relative flex h-2.5 w-2.5 ml-1">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                botConnected ? 'bg-emerald-400' : 'bg-rose-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                botConnected ? 'bg-emerald-500' : 'bg-rose-500'
              }`}></span>
            </span>
          </button>
        </div>

        {/* Mobile Hamburger menu toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setActiveTab(activeTab === 'landing' ? 'dashboard' : 'landing')}
            className={`p-2 rounded-xl relative transition-all ${
              activeTab === 'dashboard' ? 'bg-secondary/15 text-secondary' : 'bg-surface-container text-on-surface-variant'
            }`}
          >
            {activeTab === 'landing' ? <Bot size={20} /> : <Store size={20} />}
            <span className={`absolute top-1 right-1 h-2 w-2 rounded-full ${
              botConnected ? 'bg-emerald-500' : 'bg-rose-500'
            }`}></span>
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface hover:bg-surface-container rounded-xl transition-all"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-outline-variant/30 flex flex-col gap-4 p-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleNavClick('mugs')}
              className="text-left py-2 font-body text-base font-semibold text-on-surface hover:text-primary transition-all"
            >
              Mugs
            </button>
            <button 
              onClick={() => handleNavClick('tshirts')}
              className="text-left py-2 font-body text-base font-semibold text-on-surface hover:text-primary transition-all"
            >
              Textil & Apparel
            </button>
            <button 
              onClick={() => handleNavClick('corporate')}
              className="text-left py-2 font-body text-base font-semibold text-on-surface hover:text-primary transition-all"
            >
              Regalos Corporativos
            </button>
            <button 
              onClick={() => handleNavClick('why-us')}
              className="text-left py-2 font-body text-base font-semibold text-on-surface hover:text-primary transition-all"
            >
              ¿Por qué elegirnos?
            </button>
          </div>

          <div className="h-px bg-outline-variant/30 my-2"></div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setActiveTab('landing'); setMobileMenuOpen(false); }}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-base font-bold transition-all ${
                activeTab === 'landing'
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              <Store size={18} />
              Ir a la Tienda
            </button>
            <button
              onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-base font-bold transition-all relative ${
                activeTab === 'dashboard'
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                  : 'bg-surface-container text-on-surface-variant'
              }`}
            >
              <Bot size={18} />
              Panel de Control (WhatsApp Bot)
              <span className={`h-2.5 w-2.5 rounded-full ${
                botConnected ? 'bg-emerald-500' : 'bg-rose-500'
              }`}></span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
