import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import BotDashboard from './components/BotDashboard';
import WhatsAppWidget from './components/WhatsAppWidget';
import {
  getStoredWhatsAppPhone,
  saveWhatsAppPhone,
  clearWhatsAppPhone,
  isValidWhatsAppPhone,
} from './lib/whatsapp';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [rules, setRules] = useState([
    {
      keyword: 'hola',
      response:
        '¡Hola! Bienvenido a Sublime Personalizados. ¿Te gustaría cotizar un Mug ☕, Textil 👕 o Regalos Corporativos 💼? Escribe "cotizar" o pulsa "Abrir en WhatsApp" para hablar con nosotros.',
    },
    {
      keyword: 'cotizar',
      response:
        '¡Excelente! Cuéntanos producto, cantidad y fecha de entrega. Usa el botón verde "Abrir en WhatsApp" y te atenderemos al instante con un diseñador.',
    },
    {
      keyword: 'catalogo',
      response:
        'Puedes ver nuestro catálogo en la web. Si quieres el PDF o asesoría personalizada, escríbenos por WhatsApp con el botón verde de abajo.',
    },
    {
      keyword: 'contacto',
      response:
        'Estamos en Av. Principal 1230. Horario: Lun–Vie 9:00–18:00. Para respuesta inmediata, contáctanos por WhatsApp.',
    },
    {
      keyword: 'whatsapp',
      response:
        'Te redirijo a WhatsApp en un momento. También puedes usar el botón "Abrir en WhatsApp" en el chat.',
    },
  ]);

  useEffect(() => {
    setWhatsappPhone(getStoredWhatsAppPhone());
  }, []);

  const botConnected = isValidWhatsAppPhone(whatsappPhone);

  const connectWhatsApp = useCallback((phone) => {
    const saved = saveWhatsAppPhone(phone);
    if (saved) {
      setWhatsappPhone(saved);
      return true;
    }
    return false;
  }, []);

  const disconnectWhatsApp = useCallback(() => {
    clearWhatsAppPhone();
    setWhatsappPhone('');
  }, []);

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between selection:bg-primary-container selection:text-on-primary">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} botConnected={botConnected} whatsappPhone={whatsappPhone} />

      <div className="flex-1">
        {activeTab === 'landing' ? (
          <LandingPage setActiveTab={setActiveTab} whatsappPhone={whatsappPhone} botConnected={botConnected} />
        ) : (
          <BotDashboard
            botConnected={botConnected}
            whatsappPhone={whatsappPhone}
            onConnect={connectWhatsApp}
            onDisconnect={disconnectWhatsApp}
            rules={rules}
            setRules={setRules}
          />
        )}
      </div>

      <WhatsAppWidget botConnected={botConnected} whatsappPhone={whatsappPhone} rules={rules} />
    </div>
  );
}
