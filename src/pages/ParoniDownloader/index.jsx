import React, { useEffect, useState } from 'react';
import DownloaderNavbar from './components/DownloaderNavbar';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import ImageHeroPT from './assets/image.png';
import ImageHeroEN from './assets/imageEnglish.png';
import ImageHeroES from './assets/imageEspanol.png';
import DownloaderIcon from './assets/DownloaderIcon.ico';
import './ParoniDownloader.css';

const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.54 6.5-7.17A5.1 5.1 0 0 0 19 4.3a5.2 5.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a11.5 11.5 0 0 0-6 0C6.9 1.1 5.8 1.4 5.8 1.4a5.2 5.2 0 0 0-.1 3.2 5.1 5.1 0 0 0-1.5 3.5c0 5.61 3.33 6.78 6.47 7.15a4.8 4.8 0 0 0-1 2.87V22" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const DownloadIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const YoutubeIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SpotifyIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.442 17.29a.747.747 0 0 1-1.025.247c-2.812-1.716-6.353-2.103-10.518-1.15a.747.747 0 1 1-.331-1.455c4.542-1.033 8.455-.595 11.627 1.336a.746.746 0 0 1 .247 1.022zm1.467-3.284a.936.936 0 0 1-1.291.31C14.407 12.339 9.5 11.796 5.674 12.96a.936.936 0 1 1-.546-1.793c4.321-1.314 9.743-.701 13.48 1.558a.936.936 0 0 1 .31 1.291zm.145-3.414C15.201 8.358 8.847 8.146 5.158 9.266a1.121 1.121 0 1 1-.652-2.146c4.215-1.28 11.233-1.031 15.706 1.626a1.121 1.121 0 0 1-1.158 1.846z"/>
  </svg>
);

const TikTokIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const InstagramIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm3.98-10.169a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const TwitchIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
  </svg>
);

const TagIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
    <line x1="7" y1="7" x2="7.01" y2="7"></line>
  </svg>
);

const CalendarIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const parseMarkdown = (text) => {
  if (!text) return { __html: '' };
  
  let html = text.replace(/\r\n/g, '\n');
  html = html.replace(/^### (.*$)/gim, '<h3 style="margin: 1.5rem 0 1rem; font-size: 1.3rem;">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="margin: 1.5rem 0 1rem; font-size: 1.5rem;">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 style="margin: 1.5rem 0 1rem; font-size: 1.8rem;">$1</h1>');
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' style='width: 100%; height: auto; max-width: 100%; border-radius: 8px; margin-top: 1rem; object-fit: contain;' />");
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target='_blank' style='color: var(--primary-color); text-decoration: none;'>$1</a>");
  
  const listItems = html.split('\n').map(line => {
    if (line.trim().startsWith('- ')) {
      return `<li style="margin-bottom: 0.5rem; margin-left: 1.5rem; list-style-type: disc;">${line.trim().substring(2)}</li>`;
    }
    return line;
  });
  
  let inList = false;
  let finalHtml = '';
  
  for (let line of listItems) {
    if (line.startsWith('<li')) {
      if (!inList) {
        finalHtml += '<ul style="margin-bottom: 1rem;">\n';
        inList = true;
      }
      finalHtml += line + '\n';
    } else {
      if (inList) {
        finalHtml += '</ul>\n';
        inList = false;
      }
      if (line.trim() !== '' && !line.startsWith('<h') && !line.startsWith('<img') && !line.startsWith('<ul')) {
        finalHtml += `<p style="margin-bottom: 1rem; color: var(--text-muted); line-height: 1.6;">${line}</p>\n`;
      } else {
        finalHtml += line + '\n';
      }
    }
  }
  if (inList) finalHtml += '</ul>\n';
  
  return { __html: finalHtml };
};

const formatDate = (dateString, lang) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'es' ? 'es-ES' : 'pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};


const ParoniDownloaderContent = () => {
  const { lang, t } = useLanguage();
  const [release, setRelease] = useState(null);
  
  useEffect(() => {
    fetch('https://api.github.com/repos/RafaelParoni/Paroni-Downloader/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (data && data.tag_name) {
          setRelease(data);
        }
      })
      .catch(console.error);
  }, []);

  const exeAsset = release?.assets?.find(asset => asset.name.endsWith('.exe'));
  const downloadLink = exeAsset ? exeAsset.browser_download_url : "/Paroni_Downloader_Setup.exe";

  const currentImage = lang === 'en' ? ImageHeroEN : lang === 'es' ? ImageHeroES : ImageHeroPT;

  return (
    <>
      <DownloaderNavbar downloadLink={downloadLink} />
      <main>
        <section id="inicio" className="hero" style={{ minHeight: 'calc(100vh - 70px)', paddingTop: '4rem' }}>
          <div className="hero-wrapper">
            <div className="hero-content">
              <p className="greeting text-gradient">{t('hero.presenting')}</p>
              <h1 className="title" style={{ fontSize: '3.5rem' }}>Paroni Downloader</h1>
              
              
              <h3 className="subtitle">
                {t('hero.subtitle')} <span className="typewriter-text text-gradient">{t('hero.typewriter')}</span>
              </h3>
              
              <p className="description">
                {t('hero.description')}
              </p>
              
              <div className="btn-group" style={{ marginBottom: '1rem' }}>
                <a href={downloadLink} className="btn btn-primary">
                  <DownloadIcon size={20} />
                  {t('hero.downloadApp')}
                </a>
                
                <a href="https://github.com/RafaelParoni/Paroni-Downloader" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <GithubIcon size={20} />
                  {t('hero.sourceCode')}
                </a>
              </div>
            </div>
            
            <div className="hero-image-container" style={{ perspective: '1200px' }}>
              <img 
                src={currentImage} 
                alt="Paroni Downloader" 
                className="hero-mockup"
              />
            </div>
          </div>
        </section>

        <section id="recursos" style={{ padding: '80px 5% 100px' }}>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            {t('features.title1')} <span className="text-gradient">{t('features.title2')}</span>
          </h2>
          <p className="contact-subtitle" style={{ textAlign: 'center', maxWidth: '600px', margin: '-1.5rem auto 4rem', color: 'var(--text-muted)' }}>
            {t('features.subtitle')}
          </p>

          <div className="platforms-grid">
            <div className="platform-card">
              <div className="platform-icon" style={{ color: '#FF0000' }}>
                <YoutubeIcon size={24} />
              </div>
              <h3>{t('features.youtube.title')}</h3>
              <p>{t('features.youtube.desc')}</p>
            </div>

            <div className="platform-card">
              <div className="platform-icon" style={{ color: '#1DB954' }}>
                <SpotifyIcon size={24} />
              </div>
              <h3>{t('features.spotify.title')}</h3>
              <p>{t('features.spotify.desc')}</p>
            </div>

            <div className="platform-card">
              <div className="platform-icon" style={{ color: '#00F2FE' }}>
                <TikTokIcon size={24} />
              </div>
              <h3>{t('features.tiktok.title')}</h3>
              <p>{t('features.tiktok.desc')}</p>
            </div>

            <div className="platform-card">
              <div className="platform-icon" style={{ color: '#E1306C' }}>
                <InstagramIcon size={24} />
              </div>
              <h3>{t('features.instagram.title')}</h3>
              <p>{t('features.instagram.desc')}</p>
            </div>

            <div className="platform-card">
              <div className="platform-icon" style={{ color: '#9146FF' }}>
                <TwitchIcon size={24} />
              </div>
              <h3>{t('features.twitch.title')}</h3>
              <p>{t('features.twitch.desc')}</p>
            </div>

            <div className="platform-card" style={{ borderColor: 'transparent', background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)' }}>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#0f1219', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                </div>
                <h3 style={{ margin: 0 }}>{t('features.others.title')}</h3>
              </div>
              <p>{t('features.others.desc')}</p>
            </div>
          </div>
        </section>

        <section id="download" style={{ padding: '40px 5%' }}>
          <div className="download-cta-card">
            <h2>Transforme a forma como você baixa</h2>
            <p>Faça o download do Paroni Downloader hoje mesmo e descubra como uma interface premium pode tornar sua vida mais simples.</p>
            <a href={downloadLink} className="btn btn-primary" style={{ marginTop: '1rem', padding: '16px 32px', fontSize: '1.1rem' }}>
              <DownloadIcon size={20} />
              Baixar Versão Mais Recente
            </a>
            <span className="version-info">
              Versão {release?.tag_name || '1.4.6'} • Windows 10/11 • {release?.assets?.[0]?.size ? (release.assets[0].size / 1024 / 1024).toFixed(0) + ' MB' : '136 MB'}
            </span>
          </div>
        </section>

        <section id="atualizacoes" style={{ padding: '40px 5% 100px' }}>
          <div className="update-card">
            <div className="update-header">
              <h2>Última Atualização: {release?.tag_name || 'v1.4.6'}</h2>
              <div className="update-meta">
                <span>
                  <TagIcon size={16} /> 
                  {release?.tag_name || '1.4.6'}
                </span>
                <span>
                  <CalendarIcon size={16} /> 
                  {formatDate(release?.published_at || '2026-06-27T12:00:00Z', lang)}
                </span>
              </div>
            </div>
            <div className="update-body" dangerouslySetInnerHTML={parseMarkdown(release?.body || '### 🚀 Universal Media Downloader v1.4.6\\n\\nEstá versão traz uma atualização no visual do programa.\\n\\n### ✨ Novidades\\n\\n- Visual novo, Cores, Nome e Ícone do programa foram alterados para "Paroni Downloader" para entrar no grupo de "programas" Paroni.')} />
          </div>
        </section>
      </main>
    </>
  );
};

const ParoniDownloader = () => {
  useEffect(() => {
    const originalFavicon = document.querySelector("link[rel*='icon']")?.href;
    const originalTitle = document.title;
    
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = DownloaderIcon;
    document.title = "Paroni Downloader";
    
    return () => {
      if (link && originalFavicon) {
        link.href = originalFavicon;
      }
      document.title = originalTitle;
    };
  }, []);

  return (
    <LanguageProvider>
      <ParoniDownloaderContent />
    </LanguageProvider>
  );
};

export default ParoniDownloader;
