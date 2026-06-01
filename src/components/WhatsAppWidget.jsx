import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ExternalLink, Phone } from 'lucide-react';
import {
  openWhatsApp,
  buildChatHandoffMessage,
  matchBotRule,
  formatPhoneDisplay,
} from '../lib/whatsapp';

const WHATSAPP_ESCALATE = ['whatsapp', 'humano', 'agente', 'persona', 'llamar', 'wsp'];

export default function WhatsAppWidget({ botConnected, whatsappPhone, rules }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy el asistente de Sublime Personalizados. ☕👕 Escribe "hola", "cotizar" o "catalogo". Para hablar con un humano, escribe "whatsapp" o usa el botón verde.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [lastBotReply, setLastBotReply] = useState('');

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleOpenWhatsApp = (customMessage) => {
    if (!botConnected) return;
    const msg =
      customMessage ||
      buildChatHandoffMessage(chatMessages, lastBotReply);
    openWhatsApp(whatsappPhone, msg);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, timestamp }]);
    setInputValue('');

    const wantsWhatsApp = WHATSAPP_ESCALATE.some((k) => userText.toLowerCase().includes(k));

    if (!botConnected) {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'system',
            text: '⚠️ Vincula tu número en "Configurar Bot" (menú superior) para conectar WhatsApp.',
            timestamp,
          },
        ]);
      }, 400);
      return;
    }

    if (wantsWhatsApp) {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: 'Te abro WhatsApp con tu mensaje listo para enviar. ¡Un diseñador te atenderá!',
            timestamp,
            showWhatsAppAction: true,
          },
        ]);
        handleOpenWhatsApp(buildChatHandoffMessage([...chatMessages, { sender: 'user', text: userText }], ''));
      }, 600);
      return;
    }

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const matchedRule = matchBotRule(userText, rules);
      const botResponse = matchedRule
        ? matchedRule.response
        : 'No encontré esa consulta. Prueba "hola", "cotizar" o "catalogo". ¿Prefieres WhatsApp? Escribe "whatsapp" o pulsa el botón verde.';

      setLastBotReply(botResponse);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          showWhatsAppAction: true,
        },
      ]);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="w-[320px] sm:w-[360px] max-h-[520px] bg-slate-950 rounded-2xl shadow-[0_30px_80px_-15px_rgba(0,0,0,0.55)] border border-slate-800/80 overflow-hidden flex flex-col mb-4 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-display font-extrabold text-sm">
                  SP
                </div>
                <span
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-emerald-700 ${
                    botConnected ? 'bg-white' : 'bg-rose-300'
                  }`}
                />
              </div>
              <div>
                <h4 className="font-display font-bold text-xs flex items-center gap-1.5">
                  Sublime Bot
                  {botConnected && (
                    <span className="text-[8px] font-bold bg-white/20 px-1.5 py-0.5 rounded uppercase">WA</span>
                  )}
                </h4>
                <span className="text-[9px] text-white/80 block -mt-0.5 font-medium">
                  {botConnected ? formatPhoneDisplay(whatsappPhone) : 'Sin número vinculado'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              type="button"
            >
              <X size={16} />
            </button>
          </div>

          {botConnected && (
            <button
              type="button"
              onClick={() => handleOpenWhatsApp()}
              className="mx-3 mt-3 py-2 px-3 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-[10px] font-bold text-emerald-300 flex items-center justify-center gap-2 hover:bg-emerald-500/25 transition-all cursor-pointer"
            >
              <Phone size={12} />
              Abrir chat en WhatsApp
              <ExternalLink size={10} />
            </button>
          )}

          <div className="flex-1 p-4 bg-slate-950 overflow-y-auto space-y-3.5 no-scrollbar min-h-[220px]">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[88%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : msg.sender === 'bot' ? 'items-start' : 'mx-auto items-center'
                }`}
              >
                {msg.sender === 'system' ? (
                  <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-center">
                    <span className="text-[9px] font-semibold text-slate-400 leading-normal block">{msg.text}</span>
                  </div>
                ) : (
                  <>
                    <div
                      className={`p-2.5 rounded-2xl text-[11px] font-semibold leading-relaxed shadow ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800/40'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[7px] opacity-60 block text-right mt-1 font-medium">{msg.timestamp}</span>
                    </div>
                    {msg.showWhatsAppAction && botConnected && (
                      <button
                        type="button"
                        onClick={() => handleOpenWhatsApp()}
                        className="mt-1.5 text-[9px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle size={10} />
                        Continuar en WhatsApp
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start animate-pulse">
                <div className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce" />
                  <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1 w-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="bg-slate-900 p-2.5 border-t border-slate-800 flex items-center gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={botConnected ? 'Escribe tu mensaje...' : 'Configura tu número en el panel...'}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white outline-none focus:border-emerald-500 transition-all font-semibold"
              type="text"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Send size={12} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white rounded-full flex items-center justify-center shadow-[0_12px_40px_-8px_rgba(16,185,129,0.65)] hover:scale-110 active:scale-95 transition-all cursor-pointer relative group"
        type="button"
        aria-label="Abrir chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={26} />}
        {botConnected && !isOpen && (
          <span className="absolute -inset-1 rounded-full border-2 border-emerald-400 animate-pulse-glow -z-10" />
        )}
      </button>
    </div>
  );
}
