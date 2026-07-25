import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import QRCodeGenerator from './components/QRCodeGenerator';
import qrCustomFavicon from './assets/QrCustomIcon.ico';
import qrCustomLogo from './assets/QrCustomIcon.png';
import './QrCustom.css';

const translations = {
  pt: {
    heroTitle: "Bem-vindo ao QR Custom",
    heroSub: "Crie e gerencie seus QR Codes de forma rápida e personalizada.",
    getStarted: "Começar Agora"
  },
  en: {
    heroTitle: "Welcome to QR Custom",
    heroSub: "Create and manage your QR Codes quickly and customized.",
    getStarted: "Get Started"
  },
  es: {
    heroTitle: "Bienvenido a QR Custom",
    heroSub: "Crea y gestiona tus Códigos QR de forma rápida y personalizada.",
    getStarted: "Empezar Ahora"
  }
};

function QrCustom() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('pt');

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    // Check if language was saved (optional, but good practice)
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // Update Favicon for this page
  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']");
    const originalHref = favicon ? favicon.href : '/favicon.ico';
    
    if (favicon) {
      favicon.href = qrCustomFavicon;
    } else {
      const newFavicon = document.createElement('link');
      newFavicon.rel = 'icon';
      newFavicon.href = qrCustomFavicon;
      document.head.appendChild(newFavicon);
    }

    return () => {
      const currentFavicon = document.querySelector("link[rel~='icon']");
      if (currentFavicon) {
        currentFavicon.href = originalHref;
      }
    };
  }, []);

  // Update Document Title for this page
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Qr Custom";

    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Update theme on document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = translations[lang];

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-left" style={{ display: 'flex', gap: '1rem' }}>
          <a href={import.meta.env.VITE_INSTAGRAM} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href={import.meta.env.VITE_GITHUB_LINK} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Github">
            <FaGithub size={24} />
          </a>
        </div>

        <div className="navbar-center">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={qrCustomLogo} alt="Logo QR Custom" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
            <span className="navbar-brand text-white-forced" style={{ margin: 0 }}>QR Custom</span>
          </div>
          <Link to="/" className="navbar-subtitle gradient-text" style={{ textDecoration: 'none', cursor: 'pointer' }}>By: Rafael Paroni</Link>
        </div>

        <div className="navbar-right">
          <select
            className="lang-select"
            value={lang}
            onChange={handleLangChange}
            aria-label="Selecionar Idioma"
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Alternar Tema"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <QRCodeGenerator lang={lang} />
      </main>
    </div>
  );
}

export default QrCustom;
