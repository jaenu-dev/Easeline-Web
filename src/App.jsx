import React, { useState, useEffect } from "react";
import { ShoppingCart, Mail, Link2, Menu, X, User, Phone, Instagram, Send } from "lucide-react";

// ===== KONFIGURASI LOGO & FONT =====
const LOGO_URL = "/public/Logo Easeline.png";

const FONTS = {
  regular: "/fonts/PlusJakartaSans-Regular.ttf",
  medium: "/fonts/PlusJakartaSans-Medium.ttf",
  semibold: "/fonts/PlusJakartaSans-SemiBold.ttf",
  bold: "/fonts/PlusJakartaSans-Bold.ttf",
  extrabold: "/fonts/PlusJakartaSans-ExtraBold.ttf",
};

const HERO_IMAGE = "/src/assets/hero.png";

export default function EaselineWebsite() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const products = [
    { name: "Productivity Planner", img: "/src/assets/productivity-planner.png" },
    { name: "Financial Tracker", img: "/src/assets/financial-tracker.png" },
    { name: "Reading Journal", img: "/src/assets/trading-journal.png" },
    { name: "Accounting System", img: "/src/assets/accounting.png" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      {/* Custom Font Loader & Animation Styles */}
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
            font-family: 'CustomFont', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }

          /* ANIMASI 1: Slide In From Right (Untuk Gambar) */
          @keyframes slideInFromRight {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slideInFromRight {
            animation: slideInFromRight 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          /* ANIMASI 2: Slide In From Left (Untuk Judul "Welcome") */
          @keyframes slideInFromLeft {
            0% { transform: translateX(-100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
          }
          .animate-slideInFromLeft {
            animation: slideInFromLeft 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          /* ANIMASI 3: Slide In From Bottom (Untuk Tagline & Deskripsi) */
          @keyframes slideInFromBottom {
            0% { transform: translateY(50px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slideInFromBottom {
            animation: slideInFromBottom 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            opacity: 0; /* Mulai sembunyi dulu supaya delay bekerja */
          }
        `}</style>
      )}

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? "bg-white shadow-lg" : "bg-blue-50"}`}>
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img src="/public/Logo Easeline.png" alt="Easeline Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Easeline</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {["Tentang", "Produk", "Jasa", "Kontak"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
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
              {["Tentang", "Produk", "Jasa", "Kontak"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="block text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image - Right Side with Slide Animation */}
        <div
          className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 bg-cover bg-center bg-no-repeat opacity-20 md:opacity-100 animate-slideInFromRight"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "60%",
            backgroundPosition: "center right",
          }}
        ></div>

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-50/95 to-transparent"></div>

        {/* Content */}
        <div className="max-w-10xl mx-auto relative z-10 w-full">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl">
            {/* 1. JUDUL: Animasi dari Kiri */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-blue-900 leading-tight mb-4 sm:mb-6 animate-slideInFromLeft">
              Welcome to <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Easeline</span>
            </h1>

            {/* 2. TAGLINE KUNING: Animasi dari Bawah (Delay 0.3 detik) */}
            <div
              className="inline-block bg-yellow-400 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer mb-4 sm:mb-6 animate-slideInFromBottom"
              style={{ animationDelay: "300ms" }}
            >
              Bantu hidup kamu lebih baik!
            </div>

            {/* 3. DESKRIPSI: Animasi dari Bawah (Delay 0.6 detik) */}
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mt-4 animate-slideInFromBottom" style={{ animationDelay: "600ms" }}>
              Solusi digital terpadu untuk produktivitas dan bisnis Anda
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="tentang" data-animate className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Card Besar Atas - Tentang Easeline */}
          <div className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl mb-4 sm:mb-6 transition-all duration-700 ${visibleSections["tentang"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
            <img src="/src/assets/Gambar1.png" alt="Tentang Easeline" className="w-full h-48 sm:h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-black/60 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center items-end text-right">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">Tentang Easeline</h2>
              <p className="text-white/90 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed">
                Easeline adalah perusahaan digital yang menghadirkan produk serta layanan digital. Dengan semangat "Bantu Hidup Kamu Lebih Baik", Easeline fokus menyediakan solusi praktis untuk meningkatkan produktivitas, kerapian, dan
                efisiensi aktivitas personal maupun bisnis.
              </p>
            </div>
          </div>

          {/* 2 Card Kecil Bawah */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-700 ${visibleSections["tentang"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: "150ms" }}
            >
              <img src="/src/assets/Gambar2.png" alt="Semangat Digitalisasi" className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/60 p-4 sm:p-6 flex flex-col justify-end">
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">Semangat Digitalisasi</h3>
                <p className="text-white/90 text-xs sm:text-sm">Melalui Produk & Jasa Digital</p>
              </div>
            </div>

            <div
              className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group cursor-pointer transition-all duration-700 ${visibleSections["tentang"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <img src="/src/assets/Gambar3.png" alt="Tagline Easeline" className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent p-4 sm:p-6 flex flex-col justify-end text-center">
                <p className="text-white/80 text-xs sm:text-sm mb-1 sm:mb-2">Tagline kami</p>
                <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">"Bantu kamu lebih baik"</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="produk" data-animate className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700 ${
              visibleSections["produk"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Produk
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {products.map((product, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-700 cursor-pointer ${visibleSections["produk"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Flow Section */}
      <section id="order-flow" data-animate className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 transition-all duration-700 ${visibleSections["order-flow"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ color: "#5B6FB0" }}>
            Alur Pemesanan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 items-center">
            {[
              {
                icon: <Link2 className="w-12 h-12 sm:w-16 sm:h-16" />,
                title: "Buka produk di Lynk.id",
                desc: "https://lynk.id/easeline",
                link: true,
              },
              {
                icon: <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16" />,
                title: "Selesaikan pembayaran",
                desc: "",
                link: false,
              },
              {
                icon: <Mail className="w-12 h-12 sm:w-16 sm:h-16" />,
                title: "Sistem akan otomatis mengirim produk ke alamat email Anda",
                desc: "",
                link: false,
              },
            ].map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Icon Container */}
                <div
                  className={`bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-700 mb-3 sm:mb-4 ${visibleSections["order-flow"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div className="text-blue-600 flex justify-center">{step.icon}</div>
                </div>

                {/* Text */}
                <div className="text-center px-2">
                  <p className="text-gray-800 font-medium text-sm sm:text-base mb-1">{step.title}</p>
                  {step.link && (
                    <a href={step.desc} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs sm:text-sm underline hover:text-blue-700">
                      {step.desc}
                    </a>
                  )}
                </div>

                {/* Arrow Logic untuk Mobile & Desktop */}
                {idx < 2 && (
                  <div
                    className="flex absolute z-10 
                    /* Mobile Styles: Rotate 90deg, taruh di bawah dengan jarak lebih pendek */
                    -bottom-5 left-1/2 -translate-x-1/2 rotate-90
                    /* Desktop Styles (sm): Reset rotation, taruh di kanan */
                    sm:top-10 sm:-right-12 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:rotate-0 
                    items-center justify-center w-12 sm:w-20"
                  >
                    {/* Garis putus-putus - lebih pendek di mobile */}
                    <svg width="50" height="2" className="absolute sm:w-20">
                      <line x1="0" y1="1" x2="40" y2="1" stroke="#5B6FB0" strokeWidth="2" strokeDasharray="4,4" className="sm:hidden" />
                      <line x1="0" y1="1" x2="70" y2="1" stroke="#5B6FB0" strokeWidth="2" strokeDasharray="5,5" className="hidden sm:block" />
                    </svg>
                    {/* Arrow head */}
                    <svg width="16" height="16" viewBox="0 0 20 20" className="absolute right-0 sm:w-5 sm:h-5" style={{ transform: "translateX(3px) sm:translateX(5px)" }}>
                      <path d="M5 10 L15 10 M15 10 L11 6 M15 10 L11 14" stroke="#5B6FB0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 sm:mb-8">Keunggulan Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            {["Kualitas terjamin dengan harga terbaik", "Pengerjaan cepat dengan hasil maksimal", "Full Support After Sales"].map((advantage, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-white hover:bg-white/20 transition-colors duration-300">
                <div className="text-4xl sm:text-5xl mb-2 sm:mb-4">✓</div>
                <p className="text-base sm:text-lg font-medium">{advantage}</p>
              </div>
            ))}
          </div>
          <a href="https://wa.me/6281229363773?text=Halo%20Easeline,%20saya%20ingin%20konsultasi" target="_blank" rel="noopener noreferrer">
            <button className="mt-8 sm:mt-12 bg-yellow-400 text-gray-900 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200">
              Mulai Konsultasi Gratis Sekarang!
            </button>
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="jasa" data-animate className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transition-all duration-700 ${
              visibleSections["jasa"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Jasa Digital
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {[
              {
                title: "Website Development",
                types: ["Website Statis", "Website Dinamis"],
                staticItems: ["Landing Page", "Company Profile", "Wedding Invitation", "Simple E-Commerce"],
                dynamicItems: ["Marketplace", "Aplikasi Kasir", "E-Learning"],
                priceRange: "1.500.000 - 10.000.000",
              },
              {
                title: "Media Creative",
                types: ["Konten Statis", "Konten Dinamis"],
                staticItems: ["Design Logo", "Design Poster", "Design Banner"],
                dynamicItems: ["Video Promosi", "Video Animasi", "Social Media Content"],
                priceRange: "100.000 - 5.000.000",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-1 ${
                  visibleSections["jasa"] ? "opacity-100 translate-x-0" : idx === 0 ? "opacity-0 -translate-x-20" : "opacity-0 translate-x-20"
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{service.title}</h3>
                <div className="space-y-3 sm:space-y-4">
                  {service.types.map((type, typeIdx) => (
                    <div key={typeIdx} className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4">
                      <h4 className="font-bold mb-2 text-sm sm:text-base">{type}</h4>
                      <ul className="space-y-1 text-xs sm:text-sm">
                        {(typeIdx === 0 ? service.staticItems : service.dynamicItems).map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-center">
                            <span className="mr-2">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/20">
                  <p className="text-base sm:text-lg font-semibold">Harga: Rp {service.priceRange}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <a href="https://wa.me/6281229363773?text=Halo%20Easeline,%20saya%20ingin%20isi%20formulir" target="_blank" rel="noopener noreferrer">
              <button className="bg-yellow-400 text-gray-900 px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200">
                Isi Formulir Sekarang!
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="kontak" className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-8 sm:py-12 px-4">
        {/* PERUBAHAN 1: Ubah max-w-7xl jadi max-w-6xl agar isi tidak terlalu melebar ke samping */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Easeline</div>
            <p className="text-blue-200 mb-4 sm:mb-6 text-sm sm:text-base">Solusi Digital Terpadu untuk Bisnis Modern</p>
          </div>

          {/* Contact Info */}
          {/* PERUBAHAN 2: Hapus 'sm:text-left' agar teks tetap rata tengah di desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 text-center">
            {/* Item 1 - Owner */}
            {/* PERUBAHAN 3: Hapus 'sm:items-start' pada setiap item agar icon tetap di tengah */}
            <div className="flex flex-col items-center">
              <User className="w-6 h-6 text-white-400 mb-2" />
              <h4 className="font-bold mb-2 text-white-400 text-sm sm:text-base">Owner</h4>
              <p className="text-blue-100 text-sm sm:text-base">Wahyu Pandu Wijaya</p>
            </div>

            {/* Item 2 - WhatsApp */}
            <div className="flex flex-col items-center">
              <Phone className="w-6 h-6 text-white-400 mb-2" />
              <h4 className="font-bold mb-2 text-white-400 text-sm sm:text-base">WhatsApp</h4>
              <a href="https://wa.me/6281229363773" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                +62 812-2936-3773
              </a>
            </div>

            {/* Item 3 - Instagram */}
            <div className="flex flex-col items-center">
              <Instagram className="w-6 h-6 text-white-400 mb-2" />
              <h4 className="font-bold mb-2 text-white-400 text-sm sm:text-base">Instagram</h4>
              {/* Saya sesuaikan text IG dengan gambar yang Anda kirim */}
              <a href="https://instagram.com/planwith.easeline" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                @planwith.easeline
              </a>
            </div>

            {/* Item 4 - Email */}
            <div className="flex flex-col items-center">
              <Send className="w-6 h-6 text-white-400 mb-2" />
              <h4 className="font-bold mb-2 text-white-400 text-sm sm:text-base">Email</h4>
              {/* Saya sesuaikan email dengan gambar yang Anda kirim */}
              <a href="mailto:planwith.easeline@gmail.com" className="text-blue-100 hover:text-yellow-400 transition-colors text-sm sm:text-base">
                planwith.easeline@gmail.com
              </a>
            </div>
          </div>

          <p className="text-blue-300 text-xs sm:text-sm text-center">© 2025 planwitheaseline. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
