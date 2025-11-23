import React, { useState, useEffect } from 'react';
import { ShoppingCart, Mail, Link2, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

// ===== KONFIGURASI LOGO & FONT =====
// Ganti URL di bawah ini dengan logo dan font Anda
const LOGO_URL = "/public/Logo Easeline.png"; // Ganti dengan URL logo Anda

// Font Configuration - Taruh file font di public/fonts/
const FONTS = {
  regular: "/fonts/PlusJakartaSans-Regular.ttf",      // font-normal (400)
  medium: "/fonts/PlusJakartaSans-Medium.ttf",        // font-medium (500)
  semibold: "/fonts/PlusJakartaSans-SemiBold.ttf",    // font-semibold (600)
  bold: "/fonts/PlusJakartaSans-Bold.ttf",            // font-bold (700)
  extrabold: "/fonts/PlusJakartaSans-ExtraBold.ttf",  // font-extrabold (800)
};
// Set ke null jika tidak mau pakai custom font
// const FONTS = null;

export default function EaselineWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const heroImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop'
  ];

  const products = [
    { name: 'Productivity Planner', img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop' },
    { name: 'Financial Tracker', img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop' },
    { name: 'Reading Journal', img: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop' },
    { name: 'Accounting System', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Custom Font Loader */}
      {FONTS && (
        <style>{`
          @font-face {
            font-family: 'CustomFont';
            src: url('${FONTS.regular}') format('truetype');
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'CustomFont';
            src: url('${FONTS.medium}') format('truetype');
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'CustomFont';
            src: url('${FONTS.semibold}') format('truetype');
            font-weight: 600;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'CustomFont';
            src: url('${FONTS.bold}') format('truetype');
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'CustomFont';
            src: url('${FONTS.extrabold}') format('truetype');
            font-weight: 800;
            font-style: normal;
            font-display: swap;
          }
          body {
            font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
        `}</style>
      )}

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              {/* LOGO - Ganti dengan logo Anda */}
              <img 
                src={LOGO_URL} 
                alt="Easeline Logo" 
                className="w-10 h-10 object-contain rounded-lg"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Easeline
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Tentang', 'Produk', 'Jasa', 'Kontak'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} 
                   className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {['Tentang', 'Produk', 'Jasa', 'Kontak'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} 
                   className="block text-gray-700 hover:text-blue-600 font-medium">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight">
                Welcome to <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Easeline
                </span>
              </h1>
              <div className="inline-block bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer">
                Bantu hidup kamu lebih baik!
              </div>
              <p className="text-gray-600 text-lg mt-4">
                Solusi digital terpadu untuk produktivitas dan bisnis Anda
              </p>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                <img 
                  src={heroImages[currentSlide]} 
                  alt="Hero" 
                  className="w-full h-80 object-cover transition-opacity duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="feature-cards" data-animate className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Tentang Easeline', desc: 'Platform digital untuk meningkatkan produktivitas', img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=250&fit=crop', dark: true },
              { title: 'Fitur Unggulan', desc: 'Bantu kamu lebih baik', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop', dark: false },
              { title: 'Semangat Digitalisasi', desc: 'Bersama Easeline & Start Digital', img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop', dark: true }
            ].map((card, idx) => (
              <div key={idx} 
                   className={`relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer transform transition-all duration-700 ${
                     visibleSections['feature-cards'] 
                       ? 'opacity-100 translate-y-0' 
                       : 'opacity-0 translate-y-20'
                   }`}
                   style={{ transitionDelay: `${idx * 150}ms` }}>
                <img src={card.img} alt={card.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className={`absolute inset-0 ${card.dark ? 'bg-black/60' : 'bg-gradient-to-t from-purple-900/80 to-transparent'} p-6 flex flex-col justify-end`}>
                  <h3 className="text-white text-2xl font-bold mb-2">{card.title}</h3>
                  <p className="text-white/90">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" data-animate className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700 ${
            visibleSections['produk'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Produk
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {products.map((product, idx) => (
              <div key={idx} 
                   className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-700 cursor-pointer ${
                     visibleSections['produk']
                       ? 'opacity-100 translate-y-0'
                       : 'opacity-0 translate-y-20'
                   }`}
                   style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="relative overflow-hidden">
                  <img src={product.img} alt={product.name} 
                       className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Flow Section */}
      <section id="order-flow" data-animate className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700 ${
            visibleSections['order-flow'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Alur Pemesanan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Link2 className="w-12 h-12" />, title: 'Pilih Produk', desc: 'Pilih produk atau jasa yang Anda butuhkan' },
              { icon: <ShoppingCart className="w-12 h-12" />, title: 'Lakukan Pemesanan', desc: 'Isi form pemesanan dengan lengkap' },
              { icon: <Mail className="w-12 h-12" />, title: 'Konfirmasi Email', desc: 'Tunggu konfirmasi via email dalam 1x24 jam' }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className={`bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 ${
                  visibleSections['order-flow']
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}>
                  <div className="text-blue-600 mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Keunggulan Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Kualitas terjamin dengan harga terbaik',
              'Pengerjaan cepat dengan hasil maksimal',
              'Full Support After Sales'
            ].map((advantage, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-colors duration-300">
                <div className="text-5xl mb-4">✓</div>
                <p className="text-lg font-medium">{advantage}</p>
              </div>
            ))}
          </div>
          <button className="mt-12 bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200">
            Mulai Konsultasi Gratis Sekarang!
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="jasa" data-animate className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700 ${
            visibleSections['jasa'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Jasa Digital
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              { 
                title: 'Website Development',
                types: ['Website Statis', 'Website Dinamis'],
                staticItems: ['Landing Page', 'Company Profile', 'Wedding Invitation', 'Simple E-Commerce'],
                dynamicItems: ['Marketplace', 'Aplikasi Kasir', 'E-Learning'],
                priceRange: '1.500.000 - 10.000.000'
              },
              {
                title: 'Media Creative',
                types: ['Konten Statis', 'Konten Dinamis'],
                staticItems: ['Design Logo', 'Design Poster', 'Design Banner'],
                dynamicItems: ['Video Promosi', 'Video Animasi', 'Social Media Content'],
                priceRange: '100.000 - 5.000.000'
              }
            ].map((service, idx) => (
              <div key={idx} 
                   className={`bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-1 ${
                     visibleSections['jasa']
                       ? 'opacity-100 translate-x-0'
                       : idx === 0 ? 'opacity-0 -translate-x-20' : 'opacity-0 translate-x-20'
                   }`}
                   style={{ transitionDelay: `${idx * 200}ms` }}>
                <h3 className="text-3xl font-bold mb-6">{service.title}</h3>
                <div className="space-y-4">
                  {service.types.map((type, typeIdx) => (
                    <div key={typeIdx} className="bg-white/10 backdrop-blur rounded-lg p-4">
                      <h4 className="font-bold mb-2">{type}</h4>
                      <ul className="space-y-1 text-sm">
                        {(typeIdx === 0 ? service.staticItems : service.dynamicItems).map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center">
                            <span className="mr-2">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-lg font-semibold">Harga: Rp {service.priceRange}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200">
              Isi Formulir Sekarang!
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-3xl font-bold mb-4">Easeline</div>
          <p className="text-blue-200 mb-6">Solusi Digital Terpadu untuk Bisnis Modern</p>
          <div className="flex justify-center space-x-6 mb-8">
            {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
              <a key={social} href="#" className="hover:text-yellow-400 transition-colors duration-200">
                {social}
              </a>
            ))}
          </div>
          <p className="text-blue-300 text-sm">© 2024 Easeline. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}