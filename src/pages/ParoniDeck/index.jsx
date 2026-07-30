import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { FaInstagram, FaGithub, FaVolumeUp, FaFolderOpen, FaLink, FaKeyboard, FaMicrophoneSlash, FaPaintBrush, FaDesktop, FaMobileAlt, FaDownload, FaTools, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DesktopImage from './assets/Desktop.png';
import MobileImage from './assets/Mobile.png';
import './ParoniDeck.css';

const translations = {
  pt: {
    heroTitle: "Paroni Deck",
    heroSub: "Um Stream Deck web moderno e personalizável, integrado diretamente pelo seu navegador.",
    heroDesc: "O Paroni Deck transforma qualquer dispositivo com um navegador (como seu celular ou tablet) em um poderoso Stream Deck virtual. Controle sons, volumes, microfones e atalhos globais do seu computador com um visual elegante e alta performance.",
    featuresTitle: "Recursos Principais",
    features: [
      {
        icon: <FaVolumeUp />,
        title: "Controle de Volume e Soundpad",
        desc: "Ajuste instantaneamente o volume do Spotify, Chrome ou o volume master do Windows. Toque áudios diretamente pelo Soundpad integrado."
      },
      {
        icon: <FaKeyboard />,
        title: "Teclas F13 a F24 Virtuais",
        desc: "Expanda seu teclado usando as teclas não utilizadas (F13-F24). Perfeito para controlar atalhos globais no OBS (como Iniciar/Parar Gravação ou Mudar de Cenas)."
      },
      {
        icon: <FaMicrophoneSlash />,
        title: "Mute/Desmute no Discord",
        desc: "Controle seu microfone no Discord através de atalhos globais mapeados diretamente para um botão na sua tela."
      },
      {
        icon: <FaFolderOpen />,
        title: "Organizador de Pastas",
        desc: "Não se limite a uma tela. Crie pastas infinitas dentro do seu Paroni Deck para organizar centenas de botões por categoria."
      },
      {
        icon: <FaLink />,
        title: "Abridor de Links Rápidos",
        desc: "Configure botões para abrir instantaneamente seus sites mais visitados, ferramentas de trabalho ou streams."
      },
      {
        icon: <FaPaintBrush />,
        title: "Personalização Visual",
        desc: "Cada botão é totalmente personalizável. Escolha cores, ícones e rótulos para deixar o seu deck com a sua cara."
      }
    ],
    note: "⚠️ Nota Importante: Para a integração de áudio do Soundpad funcionar perfeitamente, é necessário ter a versão original do Soundpad instalada e rodando em segundo plano no PC.",
    downloadBtn: "Baixar Agora",
    featuresBtn: "Ver Recursos",
    downloadTitle: "Pronto para ter o controle total?",
    downloadDesc: "Transforme seu fluxo de trabalho hoje mesmo. Instale o Paroni Deck no seu PC e acesse de qualquer navegador na sua rede local.",
    reqTitle: "Requisitos do Sistema",
    reqs: [
      "Windows 10 ou 11 (64-bits)",
      "Rede local (Wi-Fi ou Cabo) para acessar via celular",
      "Soundpad (Original/Steam) aberto para integração de áudio"
    ],
    downloading: "Baixando...",
    latestVersion: "Baixar Versão Mais Recente",
    versionPrefix: "Versão",
    mbText: "MB",
    faqTitle: "Problemas Conhecidos",
    faqItems: [
      {
        title: "Porta 5000 já em uso",
        desc: "Caso a porta 5000 já esteja sendo utilizada em seu computador e não consiga alterar pelo dashboard do localhost, você pode alterar ela entrando nos arquivos do programa e editando ela no arquivo 'config.json' abra ele como bloco de notas e altere o valor do 'port': 5000."
      }
    ]
  },
  en: {
    heroTitle: "Paroni Deck",
    heroSub: "A modern, customizable web Stream Deck, integrated right from your browser.",
    heroDesc: "Paroni Deck turns any device with a browser (like your phone or tablet) into a powerful virtual Stream Deck. Control sounds, volumes, microphones, and global computer shortcuts with a sleek design and high performance.",
    featuresTitle: "Core Features",
    features: [
      {
        icon: <FaVolumeUp />,
        title: "Volume & Soundpad Control",
        desc: "Instantly adjust Spotify, Chrome, or Windows master volume. Play audio directly through the integrated Soundpad."
      },
      {
        icon: <FaKeyboard />,
        title: "Virtual F13-F24 Keys",
        desc: "Expand your keyboard using unused keys (F13-F24). Perfect for global OBS shortcuts (like Start/Stop Recording or Switching Scenes)."
      },
      {
        icon: <FaMicrophoneSlash />,
        title: "Discord Mute/Unmute",
        desc: "Control your Discord microphone through global shortcuts mapped directly to a button on your screen."
      },
      {
        icon: <FaFolderOpen />,
        title: "Folder Organizer",
        desc: "Don't limit yourself to one screen. Create endless folders inside your Paroni Deck to organize hundreds of buttons by category."
      },
      {
        icon: <FaLink />,
        title: "Quick Link Opener",
        desc: "Configure buttons to instantly open your most visited sites, work tools, or streams."
      },
      {
        icon: <FaPaintBrush />,
        title: "Visual Customization",
        desc: "Every button is fully customizable. Choose colors, icons, and labels to make your deck truly yours."
      }
    ],
    note: "⚠️ Important Note: For the Soundpad audio integration to work perfectly, you must have the original version of Soundpad installed and running in the background on your PC.",
    downloadBtn: "Download Now",
    featuresBtn: "View Features",
    downloadTitle: "Ready to take full control?",
    downloadDesc: "Transform your workflow today. Install Paroni Deck on your PC and access it from any browser on your local network.",
    reqTitle: "System Requirements",
    reqs: [
      "Windows 10 or 11 (64-bits)",
      "Local network (Wi-Fi or LAN) to access via mobile",
      "Soundpad (Original/Steam) running for audio integration"
    ],
    downloading: "Downloading...",
    latestVersion: "Download Latest Version",
    versionPrefix: "Version",
    mbText: "MB",
    faqTitle: "Known Issues",
    faqItems: [
      {
        title: "Port 5000 already in use",
        desc: "If port 5000 is already being used on your computer and you cannot change it via the localhost dashboard, you can change it by accessing the program files, opening 'config.json' in Notepad, and changing the 'port': 5000 value."
      }
    ]
  },
  es: {
    heroTitle: "Paroni Deck",
    heroSub: "Un moderno y personalizable Stream Deck web, integrado directamente desde tu navegador.",
    heroDesc: "Paroni Deck transforma cualquier dispositivo con navegador (como tu teléfono o tablet) en un potente Stream Deck virtual. Controla sonidos, volúmenes, micrófonos y atajos globales de tu PC con un diseño elegante.",
    featuresTitle: "Características Principales",
    features: [
      {
        icon: <FaVolumeUp />,
        title: "Control de Volumen y Soundpad",
        desc: "Ajusta instantáneamente el volumen de Spotify, Chrome o el volumen principal de Windows. Reproduce audios a través de Soundpad."
      },
      {
        icon: <FaKeyboard />,
        title: "Teclas F13-F24 Virtuales",
        desc: "Expande tu teclado usando teclas no utilizadas (F13-F24). Perfecto para atajos globales en OBS (como Iniciar/Detener Grabación)."
      },
      {
        icon: <FaMicrophoneSlash />,
        title: "Mutear/Desmutear Discord",
        desc: "Controla el micrófono en Discord mediante atajos globales asignados a un botón en tu pantalla."
      },
      {
        icon: <FaFolderOpen />,
        title: "Organizador de Carpetas",
        desc: "Crea infinitas carpetas dentro de tu Paroni Deck para organizar cientos de botones por categoría."
      },
      {
        icon: <FaLink />,
        title: "Abridor de Enlaces",
        desc: "Configura botones para abrir al instante tus sitios web más visitados o herramientas de trabajo."
      },
      {
        icon: <FaPaintBrush />,
        title: "Personalización Visual",
        desc: "Cada botón es completamente personalizable. Elige colores, íconos y etiquetas."
      }
    ],
    note: "⚠️ Nota Importante: Para que la integración de audio de Soundpad funcione, debes tener la versión original de Soundpad ejecutándose en segundo plano en tu PC.",
    downloadBtn: "Descargar Ahora",
    featuresBtn: "Ver Características",
    downloadTitle: "¿Listo para tener el control total?",
    downloadDesc: "Transforma tu flujo de trabajo hoy. Instala Paroni Deck en tu PC y accede desde cualquier navegador en tu red local.",
    reqTitle: "Requisitos del Sistema",
    reqs: [
      "Windows 10 o 11 (64-bits)",
      "Red local (Wi-Fi o Cable) para acceder vía móvil",
      "Soundpad (Original/Steam) abierto para integración de audio"
    ],
    downloading: "Descargando...",
    latestVersion: "Descargar Última Versión",
    versionPrefix: "Versión",
    mbText: "MB",
    faqTitle: "Problemas Conocidos",
    faqItems: [
      {
        title: "El puerto 5000 ya está en uso",
        desc: "Si el puerto 5000 ya está siendo utilizado en su computadora y no puede cambiarlo a través del panel de control del localhost, puede cambiarlo ingresando a los archivos del programa, abriendo 'config.json' en el Bloc de notas y cambiando el valor de 'port': 5000."
      }
    ]
  }
};

export default function ParoniDeck() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('pt');
  const [activeView, setActiveView] = useState('desktop');
  const [fadeState, setFadeState] = useState('in');
  const [release, setRelease] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const featureColors = [
    '#1DB954', // Spotify Green
    '#EF4444', // Vermelho (Gravação/Soundpad)
    '#5865F2', // Discord Blurple
    '#FBBF24', // Amarelo Pastas
    '#06B6D4', // Azul Links
    '#D946EF'  // Magenta Personalização
  ];

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Paroni Deck";

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }

    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      setLang(savedLang);
    }

    return () => {
      document.title = originalTitle;
    };
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/RafaelParoni/ParoniDeck/releases/latest')
      .then(res => res.json())
      .then(data => {
        if (data && data.tag_name) {
          setRelease(data);
        }
      })
      .catch(console.error);
  }, []);

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

  const t = translations[lang] || translations['pt'];

  const exeAsset = release?.assets?.find(asset => asset.name.endsWith('.exe'));
  const downloadLink = exeAsset ? exeAsset.browser_download_url : "https://github.com/RafaelParoni/ParoniDeck/releases";

  const handleToggleView = () => {
    if (fadeState === 'out') return; // previne múltiplos cliques
    setFadeState('out');
    setTimeout(() => {
      setActiveView(prev => prev === 'desktop' ? 'mobile' : 'desktop');
      setFadeState('in');
    }, 300); // 300ms igual a duração do fadeOut no CSS
  };

  return (
    <div className="paroni-deck-container">
      {/* NAVBAR: 100% isolada para ParoniDeck */}
      <nav className="deck-nav">
        <div className="deck-nav-left">
          <a href={`https://www.instagram.com/${import.meta.env.VITE_INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="deck-icon-btn" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href={import.meta.env.VITE_PARONIDECK_GITHUB} target="_blank" rel="noopener noreferrer" className="deck-icon-btn" aria-label="Github">
            <FaGithub size={24} />
          </a>
        </div>

        <div className="deck-nav-center">
          <span className="deck-nav-brand">Paroni Deck</span>
          <Link to="/" className="deck-nav-subtitle">
            by: Rafael Paroni
          </Link>
        </div>

        <div className="deck-nav-right">
          <select
            className="deck-lang-select"
            value={lang}
            onChange={handleLangChange}
            aria-label="Selecionar Idioma"
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

          <button
            className="deck-icon-btn"
            onClick={toggleTheme}
            aria-label="Alternar Tema"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="deck-hero animate-fade-in">
        <h1 className="deck-title">{t.heroTitle}</h1>
        <p className="deck-subtitle">{t.heroSub}</p>
        
        <p style={{ maxWidth: '700px', margin: '0 auto 2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {t.heroDesc}
        </p>

        <div className="deck-btn-group">
          <a href="#download" className="deck-btn deck-btn-primary">
            <FaDownload />
            {t.downloadBtn}
          </a>
          <a href="#recursos" className="deck-btn deck-btn-outline">
            <FaTools />
            {t.featuresBtn}
          </a>
        </div>

        <div className="deck-toggle-switch" onClick={handleToggleView}>
          <div className={`deck-toggle-slider ${activeView === 'mobile' ? 'slide-right' : ''}`}></div>
          <div className={`deck-toggle-option ${activeView === 'desktop' ? 'text-white' : ''}`}>
            <FaDesktop size={18} />
          </div>
          <div className={`deck-toggle-option ${activeView === 'mobile' ? 'text-white' : ''}`}>
            <FaMobileAlt size={18} />
          </div>
        </div>

        <div className="deck-showcase">
          {activeView === 'desktop' ? (
            <img src={DesktopImage} alt="Paroni Deck Desktop View" className={`deck-image-desktop animate-fade-${fadeState}`} />
          ) : (
            <img src={MobileImage} alt="Paroni Deck Mobile View" className={`deck-image-mobile animate-fade-${fadeState}`} />
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="recursos" className="deck-features">
        <h2 className="deck-features-title">{t.featuresTitle}</h2>
        <div className="features-grid">
          {t.features.map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-card" 
              style={{ '--feature-color': featureColors[idx] }}
            >
              <div className="feature-icon" style={{ color: featureColors[idx] }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="deck-note">
          {t.note}
        </div>
      </section>

      {/* DOWNLOAD SECTION */}
      <section id="download" className="deck-download-section">
        <div className="deck-download-card">
          <h2>{t.downloadTitle}</h2>
          <p>{t.downloadDesc}</p>
          
          <div className="deck-req-list">
            <h4>{t.reqTitle}</h4>
            <ul>
              {t.reqs.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </div>

          <br />

          <a href={downloadLink} className="deck-btn deck-btn-primary" style={{ display: 'inline-flex', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            <FaDownload size={20} />
            {t.latestVersion}
          </a>
          
          <span className="deck-version-info">
            {t.versionPrefix} {release?.tag_name || '1.0.0'} • Windows 10/11 • {release?.assets?.[0]?.size ? (release.assets[0].size / 1024 / 1024).toFixed(0) + ` ${t.mbText}` : `~80 ${t.mbText}`}
          </span>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="deck-faq-section">
        <h2 className="deck-faq-title">{t.faqTitle}</h2>
        <div className="deck-faq-list">
          {t.faqItems.map((item, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div 
                key={idx} 
                className={`deck-faq-card ${isExpanded ? 'expanded' : ''}`}
              >
                <div 
                  className="deck-faq-header" 
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                >
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h3>
                  <button className="deck-faq-toggle-btn">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {isExpanded && (
                  <div className="deck-faq-content">
                    <p>{item.desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
