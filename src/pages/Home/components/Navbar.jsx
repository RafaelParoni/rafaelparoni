import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Navbar() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: t('nav.about'), to: 'sobre' },
    { name: t('nav.works'), to: 'trabalhos' },
    { name: t('nav.contact'), to: 'contato' },
  ];

  return (
    <>
      <div className="mobile-brand">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
          Rafael Paroni
        </h2>
      </div>

      <nav className="navbar">
        <div className="nav-brand">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
            Rafael Paroni
          </h2>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              offset={-70}
              className="nav-link"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="nav-controls">
          <select 
            className="lang-select" 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>
          
          <button onClick={toggleTheme} className="icon-button" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>
    </>
  );
}
