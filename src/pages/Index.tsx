import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/b1a6db7d-7685-40d8-b064-fee0775de020.jpg';

const products = [
  {
    id: 1,
    name: 'Пальто Blanc',
    price: '24 900 ₽',
    description: 'Оверсайз силуэт из шерсти мериноса',
    category: 'Верхняя одежда',
    images: [
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/b1a6db7d-7685-40d8-b064-fee0775de020.jpg',
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/f5bd98ab-464f-4c78-9b80-457dbd6e41e7.jpg',
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/4a262674-c5cf-4832-9290-d24821385e1d.jpg',
    ],
    angles: ['Спереди', 'Сбоку', 'Деталь'],
  },
  {
    id: 2,
    name: 'Брюки Lin',
    price: '12 900 ₽',
    description: 'Широкий крой из льна и вискозы',
    category: 'Брюки',
    images: [
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/f5bd98ab-464f-4c78-9b80-457dbd6e41e7.jpg',
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/4a262674-c5cf-4832-9290-d24821385e1d.jpg',
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/c3413a0c-edcb-4136-9a90-9a66c2d3a1aa.jpg',
    ],
    angles: ['Спереди', 'Деталь', 'Текстура'],
  },
  {
    id: 3,
    name: 'Свитер Noir',
    price: '16 500 ₽',
    description: 'Кашемировая смесь, оверсайз крой',
    category: 'Трикотаж',
    images: [
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/c3413a0c-edcb-4136-9a90-9a66c2d3a1aa.jpg',
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/b1a6db7d-7685-40d8-b064-fee0775de020.jpg',
      'https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/4a262674-c5cf-4832-9290-d24821385e1d.jpg',
    ],
    angles: ['Вид', 'На модели', 'Деталь'],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function ProductCard({ product }: { product: typeof products[0] }) {
  const [activeImg, setActiveImg] = useState(0);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="img-zoom relative aspect-[3/4] bg-[#EDEAE4] mb-4 cursor-pointer overflow-hidden">
        <img
          src={product.images[activeImg]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-600"
        />
        {/* Angle labels — appear on hover */}
        <div className="absolute top-4 right-4 flex flex-col gap-1">
          {product.angles.map((angle, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`text-[10px] font-body tracking-widest uppercase px-2 py-1 transition-all duration-200 ${
                activeImg === i
                  ? 'bg-[#1E1A17] text-[#F5F2ED]'
                  : 'bg-[#F5F2ED]/80 text-[#1E1A17] opacity-0 group-hover:opacity-100'
              }`}
            >
              {angle}
            </button>
          ))}
        </div>
        {/* Dot indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeImg === i ? 'bg-[#1E1A17] scale-125' : 'bg-[#1E1A17]/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mb-4">
        {product.images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`flex-1 aspect-square overflow-hidden transition-all duration-200 ${
              activeImg === i ? 'ring-1 ring-[#1E1A17]' : 'opacity-50 hover:opacity-80'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <p className="font-body text-xs tracking-widest uppercase text-[#8A8178] mb-1">{product.category}</p>
          <h3 className="font-display text-xl font-light">{product.name}</h3>
          <p className="font-body text-sm text-[#8A8178] mt-1">{product.description}</p>
        </div>
        <p className="font-body text-sm font-medium">{product.price}</p>
      </div>
    </div>
  );
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'about', label: 'О бренде' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1E1A17]">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F5F2ED]/95 backdrop-blur-sm border-b border-[#D4C9B8]' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <button onClick={() => scrollTo('home')} className="font-display text-2xl tracking-[0.3em] font-light">
            MARA
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-10">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-link font-body text-xs tracking-widest uppercase transition-colors ${activeSection === link.id ? 'text-[#1E1A17] active' : 'text-[#8A8178] hover:text-[#1E1A17]'}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#F5F2ED] border-t border-[#D4C9B8] px-6 py-6 flex flex-col gap-6">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-body text-xs tracking-widest uppercase text-left text-[#1E1A17]"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="MARA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17]/65 via-[#1E1A17]/10 to-transparent" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <p
            className="font-body text-xs tracking-[0.4em] uppercase text-[#D4C9B8] mb-4 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            Коллекция Весна — Лето 2026
          </p>
          <h1
            className="font-display text-8xl md:text-[10rem] font-light text-[#F5F2ED] leading-none mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
          >
            MARA
          </h1>
          <p
            className="font-body text-sm tracking-wider text-[#D4C9B8] max-w-xs opacity-0 animate-fade-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
          >
            Одежда, в которой молчание говорит громче слов
          </p>
          <button
            onClick={() => scrollTo('catalog')}
            className="mt-8 font-body text-xs tracking-widest uppercase border border-[#F5F2ED]/60 text-[#F5F2ED] px-8 py-3 hover:bg-[#F5F2ED] hover:text-[#1E1A17] transition-all duration-300 opacity-0 animate-fade-up"
            style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
          >
            Смотреть коллекцию
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-body text-xs tracking-[0.4em] uppercase text-[#8A8178] mb-6">О бренде</p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-8">
                Простота —<br />
                <em>это форма</em><br />
                совершенства
              </h2>
              <p className="font-body text-sm leading-relaxed text-[#8A8178] max-w-sm">
                MARA создаёт одежду для тех, кто ценит тишину. Мы работаем только с натуральными материалами,
                каждая вещь сшита вручную в небольших ателье Москвы.
              </p>
              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-[#D4C9B8] pt-8">
                {[['2019', 'Год основания'], ['100%', 'Натуральные ткани'], ['Москва', 'Производство']].map(([val, label]) => (
                  <div key={label}>
                    <p className="font-display text-3xl font-light">{val}</p>
                    <p className="font-body text-xs tracking-wider text-[#8A8178] mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="img-zoom aspect-[3/4] bg-[#EDEAE4] overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/510f64f3-4cd6-476c-9e22-19d3c4bc2718/files/4a262674-c5cf-4832-9290-d24821385e1d.jpg"
                alt="О бренде MARA"
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 px-6 bg-[#EDEAE4]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="font-body text-xs tracking-[0.4em] uppercase text-[#8A8178] mb-4">Каталог</p>
              <h2 className="font-display text-5xl font-light">Коллекция</h2>
            </div>
            <p className="font-body text-xs tracking-wider text-[#8A8178] hidden md:block text-right">
              Нажмите на миниатюры<br />чтобы сменить ракурс
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="font-body text-xs tracking-[0.4em] uppercase text-[#8A8178] mb-6">Контакты</p>
              <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-10">
                Свяжитесь<br />
                <em>с нами</em>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: 'Mail', label: 'Email', value: 'hello@mara-brand.ru' },
                  { icon: 'Phone', label: 'Телефон', value: '+7 (495) 000-00-00' },
                  { icon: 'MapPin', label: 'Шоурум', value: 'Москва, ул. Пречистенка, 12' },
                  { icon: 'Clock', label: 'Часы работы', value: 'Пн–Сб, 11:00–20:00' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex gap-4 items-start border-b border-[#D4C9B8] pb-6">
                    <Icon name={icon} fallback="CircleAlert" size={16} className="text-[#8A8178] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-body text-[10px] tracking-widest uppercase text-[#8A8178]">{label}</p>
                      <p className="font-body text-sm mt-1">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#EDEAE4] p-10">
              <p className="font-body text-xs tracking-widest uppercase text-[#8A8178] mb-8">Написать нам</p>
              <div className="space-y-6">
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-[#8A8178] block mb-2">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Анна"
                    className="w-full bg-transparent border-b border-[#D4C9B8] py-2 font-body text-sm outline-none focus:border-[#1E1A17] transition-colors placeholder:text-[#8A8178]/50"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-[#8A8178] block mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="anna@example.com"
                    className="w-full bg-transparent border-b border-[#D4C9B8] py-2 font-body text-sm outline-none focus:border-[#1E1A17] transition-colors placeholder:text-[#8A8178]/50"
                  />
                </div>
                <div>
                  <label className="font-body text-[10px] tracking-widest uppercase text-[#8A8178] block mb-2">Сообщение</label>
                  <textarea
                    placeholder="Ваш вопрос или пожелание..."
                    rows={4}
                    className="w-full bg-transparent border-b border-[#D4C9B8] py-2 font-body text-sm outline-none focus:border-[#1E1A17] transition-colors placeholder:text-[#8A8178]/50 resize-none"
                  />
                </div>
                <button className="w-full bg-[#1E1A17] text-[#F5F2ED] font-body text-xs tracking-widest uppercase py-4 hover:bg-[#8A8178] transition-colors duration-300">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#D4C9B8] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-display text-xl tracking-[0.3em]">MARA</p>
          <p className="font-body text-xs text-[#8A8178]">© 2026 MARA. Все права защищены.</p>
          <div className="flex gap-6">
            {['Instagram', 'Telegram', 'VK'].map(s => (
              <a key={s} href="#" className="font-body text-xs tracking-wider text-[#8A8178] hover:text-[#1E1A17] transition-colors">
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