import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const LOGO_URL = 'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/bucket/611b4c43-0e27-4ae8-8dad-870f42b270cc.jpg';
const HERO_ART_URL = 'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/bucket/9493f6e9-381c-4b9c-bbce-9828d4ac7fe1.png';
const ABOUT_IMG_URL = 'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/bucket/7f545eee-7c64-485d-9cd4-7d859ae47455.png';

const products = [
  {
    id: 1,
    name: 'Кицунэ Оверсайз',
    price: '6 900 ₽',
    description: 'Heavyweight 320g, принт Kitsune Spirit',
    category: 'T-SHIRT',
    images: [ABOUT_IMG_URL, HERO_ART_URL, LOGO_URL],
    angles: ['Front', 'Back', 'Detail'],
  },
  {
    id: 2,
    name: 'Void Hoodie',
    price: '11 900 ₽',
    description: 'French Terry 400g, унисекс крой',
    category: 'HOODIE',
    images: [HERO_ART_URL, ABOUT_IMG_URL, LOGO_URL],
    angles: ['Front', 'Back', 'Detail'],
  },
  {
    id: 3,
    name: 'Shadow Bomber',
    price: '18 500 ₽',
    description: 'Nylon ripstop, подкладка флис',
    category: 'OUTERWEAR',
    images: [LOGO_URL, HERO_ART_URL, ABOUT_IMG_URL],
    angles: ['Front', 'Back', 'Detail'],
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [activeImg, setActiveImg] = useState(0);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Main image */}
      <div className="img-zoom relative aspect-[3/4] bg-[#111] mb-3 cursor-pointer border border-[#1E1E1E] group-hover:border-[#FF00CC]/40 transition-colors duration-500">
        <img
          src={product.images[activeImg]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Scanlines overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            zIndex: 1
          }}
        />
        {/* Category tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="font-body text-[9px] tracking-[0.3em] uppercase bg-[#FF00CC] text-black px-2 py-1">
            {product.category}
          </span>
        </div>
        {/* Angle buttons — appear on hover */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {product.angles.map((angle, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`text-[9px] font-body tracking-widest uppercase px-2 py-1 transition-all duration-200 border ${
                activeImg === i
                  ? 'bg-[#FF00CC] text-black border-[#FF00CC]'
                  : 'bg-black/80 text-[#888] border-[#333] hover:border-[#FF00CC]/50'
              }`}
            >
              {angle}
            </button>
          ))}
        </div>
        {/* Dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`transition-all duration-300 ${
                activeImg === i
                  ? 'w-4 h-0.5 bg-[#FF00CC]'
                  : 'w-1.5 h-0.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-1.5 mb-4">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`flex-1 aspect-square overflow-hidden transition-all duration-200 border ${
              activeImg === i ? 'border-[#FF00CC]' : 'border-[#1E1E1E] opacity-40 hover:opacity-70'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display text-base font-medium tracking-wider text-[#F2F2F2]">{product.name}</h3>
          <p className="font-body text-xs text-[#666] mt-1">{product.description}</p>
        </div>
        <p className="font-body text-sm text-[#FF00CC] font-medium">{product.price}</p>
      </div>
    </div>
  );
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'catalog', label: 'Shop' },
    { id: 'contacts', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F2F2] overflow-x-hidden">

      {/* Custom cursor glow */}
      <div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-[997] transition-all duration-500 ease-out"
        style={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
          background: 'radial-gradient(circle, rgba(255,0,204,0.04) 0%, transparent 70%)',
        }}
      />

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#1E1E1E]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => scrollTo('home')} className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#333] group-hover:border-[#FF00CC]/60 transition-colors">
              <img src={LOGO_URL} alt="FURIRANSA" className="w-full h-full object-cover" />
            </div>
            <span className="font-display text-lg font-semibold tracking-[0.25em] text-[#F2F2F2] animate-flicker">
              FURIRANSA
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-link font-body text-[11px] tracking-[0.2em] uppercase transition-colors ${
                  activeSection === link.id ? 'text-[#FF00CC] active' : 'text-[#666] hover:text-[#F2F2F2]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('catalog')}
              className="font-body text-[10px] tracking-widest uppercase border border-[#FF00CC]/60 text-[#FF00CC] px-4 py-2 hover:bg-[#FF00CC] hover:text-black transition-all duration-300"
            >
              Купить
            </button>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#F2F2F2]">
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0A0A0A] border-t border-[#1E1E1E] px-6 py-6 flex flex-col gap-6">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-display text-sm tracking-[0.2em] uppercase text-left text-[#F2F2F2]"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background abstract art */}
        <div className="absolute inset-0">
          <img
            src={HERO_ART_URL}
            alt=""
            className="w-full h-full object-cover opacity-30"
            style={{ filter: 'saturate(1.4) contrast(1.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-2xl">
            {/* Pre-title */}
            <div
              className="flex items-center gap-3 mb-8 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <span className="w-8 h-px bg-[#FF00CC]" />
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-[#FF00CC]">
                SS 2026 COLLECTION
              </span>
            </div>

            {/* Main title */}
            <h1
              className="font-display font-bold leading-none mb-6 opacity-0 animate-fade-up animate-glitch"
              style={{
                fontSize: 'clamp(4rem, 12vw, 9rem)',
                animationDelay: '0.3s',
                animationFillMode: 'forwards',
              }}
            >
              FURI
              <br />
              <span style={{ color: '#FF00CC', textShadow: '0 0 30px rgba(255,0,204,0.4)' }}>
                RANSA
              </span>
            </h1>

            <p
              className="font-body text-sm text-[#888] max-w-xs leading-relaxed mb-10 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              Streetwear из другого измерения. Японская мистика, уличная культура, тёмная эстетика.
            </p>

            <div
              className="flex gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
            >
              <button
                onClick={() => scrollTo('catalog')}
                className="font-display text-sm tracking-widest uppercase bg-[#FF00CC] text-black px-8 py-4 hover:bg-white transition-all duration-300 font-medium"
              >
                Shop Now
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="font-display text-sm tracking-widest uppercase border border-[#333] text-[#888] px-8 py-4 hover:border-[#F2F2F2] hover:text-[#F2F2F2] transition-all duration-300"
              >
                О бренде
              </button>
            </div>
          </div>
        </div>

        {/* Floating logo */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block animate-float">
          <img
            src={LOGO_URL}
            alt="Furiransa"
            className="w-80 h-80 object-contain opacity-60 animate-pulse-glow"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>

        {/* Bottom scroll hint */}
        <div className="absolute bottom-10 left-6 flex items-center gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-[#FF00CC] to-transparent" />
          <span className="font-body text-[9px] tracking-[0.4em] uppercase text-[#444] [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </section>

      {/* MARQUEE strip */}
      <div className="border-y border-[#1E1E1E] py-3 bg-[#0D0D0D] overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: 'marquee 20s linear infinite' }}
        >
          {Array(6).fill(null).map((_, i) => (
            <span key={i} className="font-display text-xs tracking-[0.3em] uppercase text-[#333]">
              FURIRANSA &nbsp;★&nbsp; DARK STREETWEAR &nbsp;★&nbsp; SS 2026 &nbsp;★&nbsp; MADE IN MOSCOW &nbsp;★&nbsp;
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#FF00CC] mb-6">// О бренде</p>
              <h2 className="font-display text-5xl md:text-6xl font-bold leading-tight mb-8">
                ГДЕ ВОСТОК<br />
                <span className="text-[#666]">ВСТРЕЧАЕТ</span><br />
                УЛИЦУ
              </h2>
              <p className="font-body text-sm text-[#666] leading-relaxed max-w-sm mb-6">
                FURIRANSA — это больше, чем одежда. Это манифест тех, кто чувствует мир иначе.
                Мы берём образы японской мифологии и пропускаем их сквозь призму уличной культуры.
              </p>
              <p className="font-body text-sm text-[#444] leading-relaxed max-w-sm">
                Каждый дроп — это история. Каждый принт — это символ. Малые тиражи, ручная печать,
                натуральные ткани.
              </p>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#1E1E1E] pt-8">
                {[['2022', 'Основан'], ['< 100', 'Штук в дропе'], ['100%', 'Ручная печать']].map(([val, label]) => (
                  <div key={label}>
                    <p className="font-display text-2xl font-bold text-[#FF00CC]">{val}</p>
                    <p className="font-body text-xs text-[#555] mt-1 tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="img-zoom aspect-[4/5] bg-[#111] border border-[#1E1E1E]">
                <img
                  src={ABOUT_IMG_URL}
                  alt="Furiransa lookbook"
                  className="w-full h-full object-cover"
                />
                {/* Scanlines */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 6px)'
                  }}
                />
              </div>
              {/* Decorative corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-[#FF00CC]/30" />
              <div className="absolute -top-4 -left-4 w-12 h-12 border border-[#333]" />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 px-6 bg-[#0D0D0D] border-t border-[#1E1E1E]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#FF00CC] mb-4">// Магазин</p>
              <h2 className="font-display text-5xl font-bold">SS 2026</h2>
            </div>
            <div className="text-right">
              <p className="font-body text-xs text-[#444] tracking-wider">
                Нажмите на ракурс<br />чтобы сменить фото
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="font-body text-xs text-[#444] tracking-widest uppercase">
              Малые тиражи · Успей до конца дропа
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left */}
            <div>
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-[#FF00CC] mb-6">// Контакты</p>
              <h2 className="font-display text-5xl font-bold leading-tight mb-10">
                ПИШИТЕ.<br />
                <span className="text-[#333]">МЫ ОТКРЫТЫ.</span>
              </h2>
              <div className="space-y-5">
                {[
                  { icon: 'Mail', label: 'Email', value: 'drop@furiransa.ru' },
                  { icon: 'Send', label: 'Telegram', value: '@furiransa' },
                  { icon: 'Instagram', label: 'Instagram', value: '@furiransa' },
                  { icon: 'MapPin', label: 'Город', value: 'Москва, Россия' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-4 items-center border-b border-[#1A1A1A] pb-5 group hover:border-[#FF00CC]/30 transition-colors">
                    <Icon name={icon} fallback="CircleAlert" size={14} className="text-[#FF00CC] shrink-0" />
                    <div className="flex justify-between w-full">
                      <span className="font-body text-[10px] tracking-widest uppercase text-[#444]">{label}</span>
                      <span className="font-body text-sm text-[#888] group-hover:text-[#F2F2F2] transition-colors">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="border border-[#1E1E1E] p-10 bg-[#0D0D0D]">
              <p className="font-display text-sm tracking-widest uppercase text-[#555] mb-8">Написать нам</p>
              <div className="space-y-6">
                <div>
                  <label className="font-body text-[9px] tracking-widest uppercase text-[#555] block mb-2">Имя</label>
                  <input
                    type="text"
                    placeholder="Твоё имя"
                    className="w-full bg-transparent border-b border-[#1E1E1E] py-2 font-body text-sm outline-none focus:border-[#FF00CC] transition-colors placeholder:text-[#333] text-[#F2F2F2]"
                  />
                </div>
                <div>
                  <label className="font-body text-[9px] tracking-widest uppercase text-[#555] block mb-2">Email или Telegram</label>
                  <input
                    type="text"
                    placeholder="@ник или email"
                    className="w-full bg-transparent border-b border-[#1E1E1E] py-2 font-body text-sm outline-none focus:border-[#FF00CC] transition-colors placeholder:text-[#333] text-[#F2F2F2]"
                  />
                </div>
                <div>
                  <label className="font-body text-[9px] tracking-widest uppercase text-[#555] block mb-2">Сообщение</label>
                  <textarea
                    placeholder="Вопрос, коллаборация, идея..."
                    rows={4}
                    className="w-full bg-transparent border-b border-[#1E1E1E] py-2 font-body text-sm outline-none focus:border-[#FF00CC] transition-colors placeholder:text-[#333] text-[#F2F2F2] resize-none"
                  />
                </div>
                <button className="w-full bg-[#FF00CC] text-black font-display text-sm tracking-widest uppercase py-4 hover:bg-white transition-colors duration-300 font-semibold">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1A1A1A] py-10 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="" className="w-7 h-7 rounded-full object-cover opacity-60" />
            <span className="font-display text-base tracking-[0.3em] font-semibold">FURIRANSA</span>
          </div>
          <p className="font-body text-xs text-[#333]">© 2026 FURIRANSA. All rights reserved.</p>
          <div className="flex gap-6">
            {['Telegram', 'Instagram', 'VK'].map(s => (
              <a key={s} href="#" className="font-body text-[10px] tracking-wider uppercase text-[#444] hover:text-[#FF00CC] transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;
