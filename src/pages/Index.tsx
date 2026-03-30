import { useState, useEffect, useRef } from 'react';

const LOGO_URL = 'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/bucket/f91f2eb9-310d-4694-9e25-0bf5ed81fdf0.jpg';
const PHOTO_URL = 'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/bucket/499eaccb-5c7e-4d7e-8a28-40386652c8dd.jpg';
const GRAFFITI_URL = 'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/bucket/fbda1aca-ea29-410c-be15-e855f6031bbc.png';

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('L');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const about = useInView();
  const details = useInView();
  const final = useInView();

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden font-body">

      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur border-b border-white/5' : ''}`}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <img src={LOGO_URL} alt="Furiransa" className="h-9 w-9 object-contain" style={{ filter: 'invert(0)' }} />
          <span className="font-display text-sm tracking-[0.35em] uppercase text-white/70">Furiransa</span>
          <div className="w-9" />
        </div>
      </nav>

      {/* ─── HERO: чёрный фон + логотип по центру ─── */}
      <section className="relative min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-0 select-none">
          <img
            src={LOGO_URL}
            alt="Furiransa kitsune"
            className="w-[min(72vw,520px)] object-contain"
            style={{ filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.04))' }}
          />
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
          <span className="font-body text-[10px] tracking-[0.4em] uppercase text-white/20">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ─── PRODUCT SECTION ─── */}
      <section className="relative bg-black">

        {/* большая фотография */}
        <div className="w-full aspect-[3/4] md:aspect-[16/9] relative overflow-hidden">
          <img
            src={PHOTO_URL}
            alt="Furiransa tee"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'contrast(1.05) saturate(0.9)' }}
          />
          {/* gradient fade bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* overlay text */}
          <div className="absolute bottom-0 left-0 right-0 px-8 md:px-20 pb-12 md:pb-20">
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/40 mb-3">SS 2026 · Drop 001</p>
            <h1 className="font-display text-5xl md:text-8xl font-bold leading-none tracking-tight">
              KITSUNE<br />
              <span className="text-white/30">OVERSIZED</span>
            </h1>
          </div>
        </div>

        {/* ─── BUY BLOCK ─── */}
        <div className="max-w-screen-xl mx-auto px-6 md:px-20 py-20 grid md:grid-cols-2 gap-16 items-start">

          {/* left — desc */}
          <div
            ref={about.ref}
            className={`transition-all duration-1000 ${about.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/30 mb-6">Об арт-объекте</p>
            <p className="font-body text-base text-white/60 leading-relaxed mb-4">
              Оверсайз-футболка с авторским принтом Kitsune Spirit — духа-лисы из японской мифологии. Принт выполнен в технике DTF на плотном хлопке 320g/m².
            </p>
            <p className="font-body text-sm text-white/30 leading-relaxed mb-10">
              Каждое изделие — нумерованный экземпляр малого тиража. Дроп ограничен.
            </p>
            <div className="grid grid-cols-3 gap-px bg-white/5">
              {[['320 g/m²', 'Плотность'], ['100%', 'Хлопок'], ['< 50 шт', 'Тираж']].map(([v, l]) => (
                <div key={l} className="bg-black px-4 py-5">
                  <p className="font-display text-xl font-bold text-white">{v}</p>
                  <p className="font-body text-[10px] uppercase tracking-widest text-white/30 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right — buy */}
          <div
            ref={details.ref}
            className={`transition-all duration-1000 delay-200 ${details.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-body text-[10px] uppercase tracking-widest text-white/30 mb-1">Цена</p>
                <p className="font-display text-4xl font-bold">6 900 ₽</p>
              </div>
              <span className="font-body text-[10px] tracking-widest uppercase text-white/20 border border-white/10 px-3 py-1">
                В наличии
              </span>
            </div>

            {/* size */}
            <div className="mb-8">
              <p className="font-body text-[10px] uppercase tracking-widest text-white/30 mb-3">Размер</p>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-10 h-10 font-body text-xs transition-all duration-200 border ${
                      size === s
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white/40 border-white/10 hover:border-white/40 hover:text-white/80'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* qty */}
            <div className="mb-8">
              <p className="font-body text-[10px] uppercase tracking-widest text-white/30 mb-3">Количество</p>
              <div className="flex items-center gap-0 border border-white/10 w-fit">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 text-white/40 hover:text-white transition-colors text-lg leading-none"
                >−</button>
                <span className="w-10 text-center font-display text-sm">{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(5, q + 1))}
                  className="w-10 h-10 text-white/40 hover:text-white transition-colors text-lg leading-none"
                >+</button>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              className={`w-full py-5 font-display text-sm tracking-widest uppercase font-bold transition-all duration-300 ${
                added
                  ? 'bg-white/10 text-white/40'
                  : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              {added ? '✓ Добавлено' : 'Купить — 6 900 ₽'}
            </button>

            <p className="font-body text-[10px] text-white/20 text-center mt-4 tracking-wider">
              Доставка по России · Telegram: @furiransa
            </p>
          </div>
        </div>
      </section>

      {/* ─── PRINT DETAIL ─── */}
      <section className="bg-black border-t border-white/5 py-24 px-6 md:px-20">
        <div className="max-w-screen-xl mx-auto">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/20 mb-4">Принт</p>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-16 text-white/80">Kitsune Spirit</h2>

          <div className="grid md:grid-cols-2 gap-0">
            {/* logo art large */}
            <div className="bg-[#0a0a0a] flex items-center justify-center py-20 px-10">
              <img
                src={LOGO_URL}
                alt="Print detail"
                className="w-full max-w-xs object-contain"
                style={{ filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.06))' }}
              />
            </div>
            {/* text */}
            <div className="flex flex-col justify-center px-0 md:pl-16 py-12 md:py-0">
              <p className="font-body text-sm text-white/40 leading-relaxed mb-6">
                Образ Кицунэ — духа-лисы, хранителя дорог и перекрёстков. Симметричная мандала из органических линий, вырастающих в портрет существа между мирами.
              </p>
              <p className="font-body text-sm text-white/25 leading-relaxed mb-10">
                Авторский рисунок. Ручная прорисовка. DTF-печать без ограничений по детализации.
              </p>
              <div className="space-y-3">
                {['DTF-печать, стойкая к стирке', 'Оверсайз крой, плечо спущено', 'Heavyweight 320g — не просвечивает', 'Нумерованный экземпляр в комплекте'].map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-white/30 rounded-full shrink-0" />
                    <span className="font-body text-xs text-white/40 tracking-wide">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL: GRAFFITI ─── */}
      <section
        ref={final.ref}
        className="relative overflow-hidden"
        style={{ minHeight: '100vh' }}
      >
        <img
          src={GRAFFITI_URL}
          alt=""
          className={`w-full h-full object-cover absolute inset-0 transition-all duration-1500 ${final.inView ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
          style={{ minHeight: '100vh' }}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
          <p className="font-body text-[10px] tracking-[0.6em] uppercase text-white/30 mb-6">Furiransa · SS 2026</p>
          <h2 className="font-display text-6xl md:text-9xl font-bold leading-none mb-8">
            DROP<br />
            <span className="text-white/20">001</span>
          </h2>
          <p className="font-body text-sm text-white/40 max-w-xs leading-relaxed mb-12">
            Малый тираж. Когда закончится — закончится.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display text-xs tracking-widest uppercase border border-white/20 text-white/60 px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
          >
            Купить сейчас
          </button>
        </div>

        {/* brand bottom */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <img src={LOGO_URL} alt="Furiransa" className="h-12 object-contain opacity-20" />
        </div>
      </section>

    </div>
  );
};

export default Index;
