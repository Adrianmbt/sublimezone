import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Power,
  Settings,
  Plus,
  Trash2,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  Send,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import {
  formatPhoneDisplay,
  isValidWhatsAppPhone,
  normalizePhone,
  openWhatsApp,
  buildWhatsAppUrl,
  matchBotRule,
} from '../lib/whatsapp';

export default function BotDashboard({
  botConnected,
  whatsappPhone,
  onConnect,
  onDisconnect,
  rules,
  setRules,
}) {
  const [phoneInput, setPhoneInput] = useState(whatsappPhone || '');
  const [connectError, setConnectError] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Bienvenido a Sublime Personalizados. ¿Te gustaría cotizar un Mug ☕, Textil 👕 o Regalos Corporativos 💼?',
      timestamp: '15:00',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    setPhoneInput(whatsappPhone || '');
  }, [whatsappPhone]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleConnect = (e) => {
    e?.preventDefault();
    setConnectError('');
    const digits = normalizePhone(phoneInput);
    if (!isValidWhatsAppPhone(digits)) {
      setConnectError('Ingresa un número válido con código de país (ej. 56912345678 para Chile).');
      return;
    }
    if (onConnect(digits)) {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'system',
          text: `WhatsApp vinculado: ${formatPhoneDisplay(digits)}. Los visitantes pueden chatear contigo.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleDisconnect = () => {
    onDisconnect();
    setPhoneInput('');
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'system',
        text: 'WhatsApp desvinculado.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newResponse.trim()) return;
    setRules([
      ...rules,
      { keyword: newKeyword.trim().toLowerCase(), response: newResponse.trim() },
    ]);
    setNewKeyword('');
    setNewResponse('');
  };

  const handleDeleteRule = (keywordToDelete) => {
    setRules(rules.filter((rule) => rule.keyword !== keywordToDelete));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, timestamp }]);
    setInputValue('');

    if (!botConnected) {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { sender: 'system', text: '⚠️ Vincula tu número de WhatsApp arriba para activar el bot.', timestamp },
        ]);
      }, 400);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const matchedRule = matchBotRule(userText, rules);
      const botResponse = matchedRule
        ? matchedRule.response
        : 'Prueba "hola", "catalogo", "cotizar" o "contacto".';

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 900);
  };

  const waUrl = botConnected ? buildWhatsAppUrl(whatsappPhone, 'Hola, prueba de conexión desde Sublime Bot') : null;
  const qrSrc = waUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(waUrl)}`
    : null;

  return (
    <main className="pt-28 pb-20 px-6 md:px-16 max-w-[1280px] mx-auto min-h-screen bg-surface">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-xl">
          <Bot size={28} />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-on-surface">Conectar WhatsApp</h1>
          <p className="text-on-surface-variant text-xs md:text-sm font-medium">
            Vincula tu número. El bot del sitio responderá automáticamente y derivará conversaciones a tu WhatsApp real.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="glass card-3d p-6 md:p-8 rounded-2xl border border-outline-variant/30 relative overflow-hidden">
            <h3 className="font-display font-bold text-lg mb-6 flex items-center gap-2 text-on-surface">
              <Smartphone size={18} className="text-emerald-600" />
              1. Tu número de WhatsApp
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 relative aspect-square shadow-inner">
                {botConnected && qrSrc ? (
                  <div className="flex flex-col items-center text-center animate-in zoom-in duration-300">
                    <img src={qrSrc} alt="QR para abrir WhatsApp" className="w-36 h-36 rounded-lg bg-white p-2 shadow-lg" />
                    <span className="text-emerald-400 font-display font-bold text-xs tracking-wide uppercase mt-4">
                      Escanea para probar
                    </span>
                    <span className="text-slate-400 text-[10px] mt-1">Abre un chat contigo mismo</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center px-4">
                    <div className="w-16 h-16 bg-slate-800 text-slate-500 rounded-full flex items-center justify-center mb-3">
                      <ShieldCheck size={32} />
                    </div>
                    <span className="text-slate-400 text-xs">El QR aparecerá al vincular tu número</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <form onSubmit={handleConnect} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                      Número (código país + número)
                    </label>
                    <input
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      disabled={botConnected}
                      placeholder="56912345678"
                      className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl p-3 text-sm outline-none transition-all disabled:opacity-60"
                      type="tel"
                    />
                    <p className="text-[10px] text-on-surface-variant">
                      Sin espacios ni +. Ejemplo Chile: 56 + 9 dígitos = 569XXXXXXXX
                    </p>
                  </div>
                  {connectError && (
                    <p className="text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {connectError}
                    </p>
                  )}
                  {botConnected ? (
                    <div className="flex flex-col gap-2">
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 p-3 rounded-xl">
                        <span className="text-[10px] text-emerald-700 font-bold uppercase">Conectado</span>
                        <p className="text-sm font-bold text-on-surface">{formatPhoneDisplay(whatsappPhone)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openWhatsApp(whatsappPhone, 'Hola, prueba desde mi web Sublime')}
                        className="w-full py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white flex items-center justify-center gap-2 hover:bg-emerald-500 cursor-pointer"
                      >
                        <ExternalLink size={14} />
                        Probar en WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={handleDisconnect}
                        className="w-full py-2.5 rounded-xl font-bold text-xs bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Power size={14} />
                        Desvincular
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:scale-[0.99] active:scale-95 cursor-pointer"
                    >
                      Vincular WhatsApp
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div className="glass card-3d p-6 md:p-8 rounded-2xl border border-outline-variant/30">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-on-surface">
              <Settings size={18} className="text-primary" />
              2. Respuestas automáticas
            </h3>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              Si el mensaje del visitante contiene la palabra clave, el bot responde con el texto configurado.
            </p>

            <form onSubmit={handleAddRule} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6 items-end">
              <div className="md:col-span-4 space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Palabra clave</label>
                <input
                  required
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="ej. precio"
                  className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl p-2.5 text-xs outline-none"
                  type="text"
                />
              </div>
              <div className="md:col-span-6 space-y-1.5">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Respuesta</label>
                <input
                  required
                  value={newResponse}
                  onChange={(e) => setNewResponse(e.target.value)}
                  placeholder="ej. Los mugs desde $8.990..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl p-2.5 text-xs outline-none"
                  type="text"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-container flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus size={14} /> Añadir
                </button>
              </div>
            </form>

            <div className="max-h-[260px] overflow-y-auto pr-2 no-scrollbar space-y-3">
              {rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3.5 bg-surface-container-low border border-outline-variant/20 rounded-xl hover:border-primary/20 transition-all"
                >
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md uppercase">
                      {rule.keyword}
                    </span>
                    <p className="text-on-surface-variant text-xs font-medium leading-relaxed">{rule.response}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteRule(rule.keyword)}
                    className="text-on-surface-variant hover:text-rose-600 p-2 hover:bg-rose-50 rounded-lg cursor-pointer"
                    type="button"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="glass card-3d rounded-2xl border border-outline-variant/30 overflow-hidden aspect-[9/16] max-h-[640px] flex flex-col">
            <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-display font-extrabold text-sm">
                  SP
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs">Vista previa del bot</h4>
                  <span className="text-[9px] text-slate-400">{botConnected ? 'WhatsApp activo' : 'Sin vincular'}</span>
                </div>
              </div>
              {botConnected && (
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </div>

            <div className="flex-1 bg-slate-950 p-4 overflow-y-auto space-y-4 no-scrollbar">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto items-end' : msg.sender === 'bot' ? 'items-start' : 'mx-auto'
                  }`}
                >
                  {msg.sender === 'system' ? (
                    <div className="bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
                      <span className="text-[9px] font-bold text-slate-400 uppercase text-center block">{msg.text}</span>
                    </div>
                  ) : (
                    <div
                      className={`p-3 rounded-2xl text-xs font-semibold leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800/50'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[8px] opacity-50 block text-right mt-1">{msg.timestamp}</span>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-3 rounded-2xl w-fit">
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="bg-slate-900 p-3 border-t border-slate-800 flex gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Prueba: hola, cotizar..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-4 text-xs text-white outline-none focus:border-emerald-500 font-semibold"
                type="text"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 bg-emerald-500 text-white rounded-xl flex items-center justify-center disabled:opacity-50 cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
