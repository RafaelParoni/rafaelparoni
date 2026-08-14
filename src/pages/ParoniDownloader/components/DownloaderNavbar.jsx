import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function DownloaderNavbar({ downloadLink }) {
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

  const githubLink = import.meta.env.VITE_PARONIDOWNLOADER_GITHUB;
  const instagramUser = import.meta.env.VITE_INSTAGRAM;
  const instagramLink = `https://instagram.com/${instagramUser}`;

  return (
    <>
      {/* Mobile Top Brand Bar */}
      <div className="mobile-brand" style={{ justifyContent: 'space-between', padding: '0 5%' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px' }}>
          Paroni Downloader
        </h2>
         <a className="navbar-subtitle" href='https://github.com/rafaelparoni' target='_blank' rel='noopener noreferrer' >By: Rafael Paroni</a>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="icon-button" style={{ color: 'var(--text)' }} aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="icon-button" style={{ color: 'var(--text)' }} aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.54 6.5-7.17A5.1 5.1 0 0 0 19 4.3a5.2 5.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C6.9 1.1 5.8 1.4 5.8 1.4a5.2 5.2 0 0 0-.1 3.2 5.1 5.1 0 0 0-1.5 3.5c0 5.61 3.33 6.78 6.47 7.15a4.8 4.8 0 0 0-1 2.87V22"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </div>
      </div>

      <nav className="navbar">
        {/* Left: Title & Social Links */}
        <div className="nav-brand">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px', whiteSpace: 'nowrap' }}>
            Paroni Downloader
          </h2>
           <a className="navbar-subtitle" href='/' target='_blank' rel='noopener noreferrer' >By: Rafael Paroni</a>
          <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="icon-button" style={{ color: 'var(--text)' }} aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href={githubLink} target="_blank" rel="noopener noreferrer" className="icon-button" style={{ color: 'var(--text)' }} aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.54 6.5-7.17A5.1 5.1 0 0 0 19 4.3a5.2 5.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C6.9 1.1 5.8 1.4 5.8 1.4a5.2 5.2 0 0 0-.1 3.2 5.1 5.1 0 0 0-1.5 3.5c0 5.61 3.33 6.78 6.47 7.15a4.8 4.8 0 0 0-1 2.87V22"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </div>

        {/* Center: Navigation Links */}
        <div className="nav-links">
          <a href="#recursos" className="nav-link">{t('navbar.features')}</a>
          <a href={downloadLink || "/Paroni_Downloader_Setup.exe"} className="nav-link">{t('navbar.download')}</a>
          <a href="#atualizacoes" className="nav-link">{t('navbar.updates')}</a>
          <a href="#codigo-aberto" className="nav-link">{t('navbar.opensource')}</a>
        </div>

        {/* Right: Controls */}
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
