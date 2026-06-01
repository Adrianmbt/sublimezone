const STORAGE_KEY = 'sublime_whatsapp_phone';

/** Solo dígitos; wa.me usa código país sin + */
export function normalizePhone(raw) {
  return String(raw || '').replace(/\D/g, '');
}

export function formatPhoneDisplay(phone) {
  const digits = normalizePhone(phone);
  if (digits.length < 10) return phone || '—';
  const cc = digits.slice(0, digits.length - 9);
  const rest = digits.slice(-9);
  return `+${cc} ${rest.slice(0, 1)} ${rest.slice(1, 5)} ${rest.slice(5)}`;
}

export function isValidWhatsAppPhone(phone) {
  const digits = normalizePhone(phone);
  return digits.length >= 10 && digits.length <= 15;
}

export function buildWhatsAppUrl(phone, message = '') {
  const digits = normalizePhone(phone);
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  const text = message.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function openWhatsApp(phone, message = '') {
  const url = buildWhatsAppUrl(phone, message);
  if (!url) return false;
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}

export function getStoredWhatsAppPhone() {
  try {
    const envPhone = import.meta.env.VITE_WHATSAPP_NUMBER;
    const stored = localStorage.getItem(STORAGE_KEY);
    return normalizePhone(stored || envPhone || '');
  } catch {
    return normalizePhone(import.meta.env.VITE_WHATSAPP_NUMBER || '');
  }
}

export function saveWhatsAppPhone(phone) {
  const digits = normalizePhone(phone);
  if (!isValidWhatsAppPhone(digits)) return false;
  localStorage.setItem(STORAGE_KEY, digits);
  return digits;
}

export function clearWhatsAppPhone() {
  localStorage.removeItem(STORAGE_KEY);
}

export function buildChatHandoffMessage(userMessages = [], lastBotReply = '') {
  const recent = userMessages
    .filter((m) => m.sender === 'user')
    .slice(-3)
    .map((m) => `• ${m.text}`)
    .join('\n');

  let body = '¡Hola Sublime Personalizados! 👋\nVengo desde la web y me gustaría cotizar.';
  if (recent) {
    body += `\n\nMis consultas:\n${recent}`;
  }
  if (lastBotReply) {
    body += `\n\n(El asistente web sugirió: ${lastBotReply.slice(0, 120)}${lastBotReply.length > 120 ? '…' : ''})`;
  }
  return body;
}

export function matchBotRule(text, rules) {
  const normalized = text.toLowerCase().trim();
  return rules.find((rule) => normalized.includes(rule.keyword.toLowerCase()));
}
