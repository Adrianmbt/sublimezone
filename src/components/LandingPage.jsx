import React, { useState } from 'react';
import { Coffee, Shirt, Briefcase, CheckCircle, ArrowRight, MessageCircle, Send, Check, Sparkles } from 'lucide-react';
import HeroScene3D from './HeroScene3D';
import TiltCard from './TiltCard';
import { openWhatsApp } from '../lib/whatsapp';

export default function LandingPage({ setActiveTab, whatsappPhone, botConnected }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: 'Mugs Personalizados'
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', product: 'Mugs Personalizados' });
    }, 4000);
  };

  return (
    <main className="pt-24 bg-surface text-on-surface">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-16 max-w-[1280px] mx-auto py-12 overflow-visible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Hero Left: Content & Lead Form */}
          <div className="z-10 order-2 lg:order-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={14} />
              Sublimación 3D Premium
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-on-surface mb-6 leading-tight">
              Tus Ideas, Plasmadas con <span className="text-primary italic drop-shadow-sm">Perfección</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-10 max-w-xl">
              Especialistas en sublimación de alta gama. Desde una sola pieza hasta grandes volúmenes corporativos con tecnología de punta y acabados vibrantes.
            </p>
            
            {/* Lead Form Component */}
            <div className="glass card-3d p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
              <h3 className="font-display font-bold text-2xl text-on-surface mb-6">Solicitar Presupuesto</h3>
              
              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} />
                  </div>
                  <h4 className="font-display font-bold text-lg text-on-surface mb-1">¡Solicitud Enviada!</h4>
                  <p className="text-sm text-on-surface-variant max-w-xs">
                    Hemos recibido tus datos correctamente. Uno de nuestros diseñadores te contactará en breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Nombre</label>
                      <input 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl p-3 text-sm transition-all outline-none" 
                        placeholder="Tu nombre" 
                        type="text"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email</label>
                      <input 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl p-3 text-sm transition-all outline-none" 
                        placeholder="hola@ejemplo.com" 
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Producto de Interés</label>
                    <select 
                      value={formData.product}
                      onChange={(e) => setFormData({...formData, product: e.target.value})}
                      className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl p-3 text-sm transition-all outline-none"
                    >
                      <option>Mugs Personalizados</option>
                      <option>T-Shirts & Textil</option>
                      <option>Regalos Corporativos</option>
                      <option>Otros</option>
                    </select>
                  </div>
                  <button 
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-container text-white font-semibold rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[0.99] active:scale-95 transition-all flex justify-center items-center gap-2 cursor-pointer" 
                    type="submit"
                  >
                    Enviar Solicitud
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Hero Right: escena 3D interactiva */}
          <div className="relative order-1 lg:order-2">
            <HeroScene3D />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-16 max-w-[1280px] mx-auto scroll-mt-24" id="mugs">
        <div className="text-center mb-16">
          <span className="text-primary font-bold text-xs tracking-widest uppercase">Especialidades</span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 text-on-surface">Nuestros Servicios</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard delay={0} glowClass="from-primary/30 to-primary/5">
            <div className="group card-3d bg-surface-container-low rounded-2xl p-8 border border-outline-variant/20 flex flex-col justify-between h-full min-h-[280px]">
              <div>
                <div className="mb-6 w-14 h-14 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300" style={{ transform: 'translateZ(24px)' }}>
                  <Coffee size={28} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-on-surface">Mugs de Autor</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Cerámica y polímero con recubrimiento premium. Colores vibrantes que resisten el lavado.
                </p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 text-primary font-bold text-xs hover:gap-3 transition-all">
                Explorar Diseños <ArrowRight size={14} />
              </button>
            </div>
          </TiltCard>

          <TiltCard delay={0.1} glowClass="from-secondary/30 to-secondary/5">
            <div id="tshirts" className="group card-3d bg-surface-container-low rounded-2xl p-8 border border-outline-variant/20 flex flex-col justify-between h-full min-h-[280px] scroll-mt-24">
              <div>
                <div className="mb-6 w-14 h-14 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center text-secondary group-hover:scale-110 transition-transform duration-300">
                  <Shirt size={28} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-on-surface">Textil & Apparel</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Dry-fit, polerones y gorros con estampado de alta definición integrado en la tela.
                </p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 text-secondary font-bold text-xs hover:gap-3 transition-all">
                Personalizar Ropa <ArrowRight size={14} />
              </button>
            </div>
          </TiltCard>

          <TiltCard delay={0.2} glowClass="from-tertiary/30 to-tertiary/5">
            <div id="corporate" className="group card-3d bg-surface-container-low rounded-2xl p-8 border border-outline-variant/20 flex flex-col justify-between h-full min-h-[280px] scroll-mt-24">
              <div>
                <div className="mb-6 w-14 h-14 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform duration-300">
                  <Briefcase size={28} />
                </div>
                <h3 className="font-display font-bold text-xl mb-3 text-on-surface">Regalos Corporativos</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  Merchandising de alto impacto: termos, kits de bienvenida y más.
                </p>
              </div>
              <button type="button" className="inline-flex items-center gap-2 text-tertiary font-bold text-xs hover:gap-3 transition-all">
                Ver Catálogo <ArrowRight size={14} />
              </button>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-surface-container-low py-24 scroll-mt-24" id="why-us">
        <div className="px-6 md:px-16 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Workshop image container with soft glow */}
            <div className="relative group">
              <div className="aspect-square rounded-3xl overflow-hidden card-3d relative z-10 border border-outline-variant/20 transition-transform duration-500 group-hover:scale-[1.02] group-hover:-rotate-1">
                <img 
                  alt="Taller industrial de sublimación de alta gama" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOtkKoS3jZmaGTzjhx1TDvz6Unm_tNVVd7x-wTxbBaa0fWpQQN4k-bkvsRhb3bZ9L-zwSIcp9SRZeu-IXyH36ZiiHaXkbzT4XWLqKZMxVlYUbAsUvIkl9xg8pa2x5Drs4Y_rDz1b5oIFpGdVIrM4x3wwg5bbohxiLUsqEZKEz-WJ3qyUaWsPZSJVH0gKZy-62BDSDgfntRjhKub2CiM5oUqERxjt6A6nx9YhPuWFGviy_7aXENBnYsn1LjLydBYB-ruRd8qrxsRxI" 
                />
              </div>
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-primary/10 rounded-full blur-3xl"></div>
            </div>
            
            {/* Core Values / Benefits */}
            <div className="flex flex-col justify-center">
              <h2 className="font-display font-extrabold text-3xl md:text-4xl mb-8 text-on-surface">¿Por qué elegirnos?</h2>
              
              <div className="space-y-8">
                {/* Value 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base mb-1 text-on-surface">Velocidad de Respuesta</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Entregas rápidas sin comprometer la calidad. Entendemos las urgencias de tu negocio y nos adaptamos a plazos exigentes.
                    </p>
                  </div>
                </div>
                
                {/* Value 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base mb-1 text-on-surface">Tintas Insumos Originales</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Solo utilizamos tintas y papeles certificados para asegurar colores idénticos a tus diseños y una adherencia indeleble.
                    </p>
                  </div>
                </div>
                
                {/* Value 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base mb-1 text-on-surface">Pre-visualización Interactiva</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Validamos cada producto mediante mockups digitales hiperrealistas antes de enviarlo a producción, garantizando cero errores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 md:px-16 max-w-[1280px] mx-auto overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
          <div>
            <span className="text-secondary font-bold text-xs tracking-widest uppercase">Inspiración</span>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl mt-3 text-on-surface">Trabajos Recientes</h2>
          </div>
          <button className="px-6 py-3 border-2 border-on-surface hover:bg-on-surface hover:text-white rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer">
            Ver Galería Completa
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Gallery Item 1 */}
          <div className="group gallery-3d relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md cursor-pointer">
            <img 
              alt="Mugs personalizados con logos minimalistas" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGRXInJo1W72BJWClhIO4Ny01MbZUj_uaRoMPRifs4SLpRXYXGSORvvgu_5w7hxiFGS__zk094NZtDgpSxuHus4bEp1OBMHleI5s_WMgNfLZi06UUiMdOQ8NaSdwwvuOZ6qHKqdF4b37nnxg9tKvpbTgpTVAFF-xDuyOyRCwNPYMQxM3ayfLgWiFaoHp6WgPO_NMVREn3mf3JhpNPvecb7BOY-ZwKXuAY1ENEq5NkcIwEdLwNiEJYicXgGvcnmMYlXbr4BFQZqIRmD" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Corporativo</span>
              <h5 className="text-white font-display font-bold text-sm mt-1">Startup Kit v1</h5>
            </div>
          </div>
          
          {/* Gallery Item 2 */}
          <div className="group gallery-3d relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md md:mt-8 cursor-pointer">
            <img 
              alt="Modelo usando camiseta personalizada con gradiente" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfkzpa8ur9lhrRVuvHlGsnJV1sP40gZgZmSBogaOmDlKyHoRSjXk8Xx4e2OKkVV1Ol78QJeXhwETJZGpixLjj3U9QCUimt8yx9MFfzerp5tqyznB8P2dqae2w_o7RjiBHlaQeRB3ClxXhin3YYqiWShSBMh_-UteaWZiF_athrmlXL1G_4FyZ8V-mbk0qbKVDgvGwOjjHfVnoZ308uZ-FeAWEfhHknT8SqFP49sRErIr4YMh2xq_Xg-2QKFqYfc0zruAUTQ5M6_ez_" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Textil</span>
              <h5 className="text-white font-display font-bold text-sm mt-1">Summer Gradient</h5>
            </div>
          </div>
          
          {/* Gallery Item 3 */}
          <div className="group gallery-3d relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md cursor-pointer">
            <img 
              alt="Papelería y cuaderno personalizado elegante" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWMLJ69r_XC5wuavJ8AXSymx3_LsZO0qLPRTihUoZZc3_HsDqi-sXrT8VgnzwSedVyZxc_4kO52HfpSH_t-KBlg0KISYgn8UP-9_lZYbW6SlC7YIWrhwSVIfrwMUrWDlC8_jT--SoN11f0QYMvwx2aqvHTnF5I3AwJQYclYhfIfv05mR8RxHeghJl8mlsjs3p1Y3bao5hJdqT-ZvXWZIDMsOrz0QUnNxjgOwyrUjRlEoWeS-7EUwraiH2qCqoMh8Sqo_iNbF5bM8Qe" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Gifts</span>
              <h5 className="text-white font-display font-bold text-sm mt-1">Executive Notebook</h5>
            </div>
          </div>
          
          {/* Gallery Item 4 */}
          <div className="group gallery-3d relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md md:mt-8 cursor-pointer">
            <img 
              alt="Botella metálica deportiva sublimada con logo" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDKiOOQmN6tKvCimcLn8dOj09YMWyHu2NguX847Lx55XA7JcimX2gToB2VZHk4p8_2ibBcgF49YN10j6LiktX_GZsKhAiaSpmXEh_uV3xLJIAp9f_aUc_pYVA7lLAWsVU71IYtbF90LfFIyCP2TboKijtXUXujFLUGy5zZv-nfv9WA0gDdCOrLISh1-PG9oF7HUORYRdF0Uev_m8gQebiCdJWYGX_xHXmi3qoEennwZApR7HXduDqO9uIBPADJFJyA-uBQKEGJC1SD" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5">
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Premium</span>
              <h5 className="text-white font-display font-bold text-sm mt-1">Active Hydration</h5>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-16 max-w-[1280px] mx-auto">
        <div className="cta-3d bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-10 md:p-14 text-center text-white relative overflow-hidden transition-transform duration-300">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full -mr-48 -mb-48 blur-3xl"></div>
          
          <h2 className="font-display font-extrabold text-3xl md:text-4xl relative z-10 mb-6">
            ¿Listo para dar vida a tus proyectos?
          </h2>
          <p className="text-sm md:text-base relative z-10 mb-10 max-w-2xl mx-auto opacity-90 leading-relaxed font-medium">
            Únete a cientos de marcas y creadores que ya confían en nosotros para sus necesidades de merchandising y personalización. Configura nuestro chatbot en la pestaña superior para cotizar al instante.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button 
              onClick={() => {
                const element = document.getElementById('mugs');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-primary hover:bg-slate-50 px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer"
            >
              Comenzar a Comprar
            </button>
            <button
              type="button"
              onClick={() => {
                if (botConnected) {
                  openWhatsApp(whatsappPhone, '¡Hola Sublime! Quiero cotizar un proyecto personalizado.');
                } else {
                  setActiveTab('dashboard');
                }
              }}
              className="border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
            >
              <MessageCircle size={16} />
              {botConnected ? 'Escribir por WhatsApp' : 'Configurar WhatsApp'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-16 max-w-[1280px] mx-auto border-t border-outline-variant/30 pt-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                <span className="text-lg">S</span>
              </div>
              <span className="font-display font-extrabold text-base tracking-tight text-on-surface">
                Sublime Personalizados
              </span>
            </div>
            <p className="text-on-surface-variant text-xs font-medium leading-relaxed">
              © 2026 Sublime Personalizados. Infinite Possibilities in Every Print.
            </p>
          </div>
          
          <div className="space-y-3">
            <h6 className="font-bold text-sm text-on-surface uppercase tracking-wider">Explorar</h6>
            <nav className="flex flex-col gap-2">
              <a className="text-on-surface-variant hover:text-primary transition-all text-xs font-semibold" href="#">Políticas de Privacidad</a>
              <a className="text-on-surface-variant hover:text-primary transition-all text-xs font-semibold" href="#">Términos del Servicio</a>
            </nav>
          </div>
          
          <div className="space-y-3">
            <h6 className="font-bold text-sm text-on-surface uppercase tracking-wider">Servicios</h6>
            <nav className="flex flex-col gap-2">
              <a className="text-on-surface-variant hover:text-primary transition-all text-xs font-semibold" href="#">Pedidos Corporativos</a>
              <a className="text-on-surface-variant hover:text-primary transition-all text-xs font-semibold" href="#">Seguimiento de Envío</a>
            </nav>
          </div>
          
          <div className="space-y-3">
            <h6 className="font-bold text-sm text-on-surface uppercase tracking-wider">Creado con Tecnología</h6>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Desarrollado en React + Tailwind Engine, optimizado con herramientas de alto rendimiento.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
