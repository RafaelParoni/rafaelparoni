import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { FaInstagram, FaGithub, FaWifi, FaLaptopCode, FaTerminal, FaPlayCircle, FaEyeSlash, FaBoxOpen, FaDownload, FaTools, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './AudioSync.css'; // Reusing the same style
import AudioSyncIcon from './assets/AudioSyncNoText.ico';
import AudioSyncLogo from './assets/AudioSyncNoBG.png';

const translations = {
  pt: {
    heroTitle: "Audio Sync",
    heroSub: "Espelhe o áudio do seu computador em tempo real para outra máquina na rede local.",
    heroDesc: "O AudioSync é um software criado para espelhar, em tempo real e com baixíssima latência (via UDP), todo o áudio do seu computador (como um Notebook) diretamente para as caixas de som de outro computador (como um PC Desktop) na mesma rede local. Utiliza a biblioteca pyaudiowpatch integrada à API nativa WASAPI do Windows.",
    featuresTitle: "🌟 Funcionalidades",
    features: [
      {
        icon: <FaWifi />,
        title: "Modo Servidor & Cliente",
        desc: "Configure facilmente qual máquina irá Enviar o som (Client) e qual irá Receber (Server)."
      },
      {
        icon: <FaLaptopCode />,
        title: "Interface Gráfica Premium",
        desc: "Criada com CustomTkinter com gradientes estéticos (Ciano/Azul Escuro)."
      },
      {
        icon: <FaTerminal />,
        title: "Console de Logs",
        desc: "Visualize erros ou as conexões (Server/Client) em tempo real de forma prática usando o sistema nativo de menu."
      },
      {
        icon: <FaPlayCircle />,
        title: "Autostart & Autosync",
        desc: "Capacidade de iniciar automaticamente junto ao Windows (salva no Registro) e iniciar a sincronização automaticamente ao abrir."
      },
      {
        icon: <FaEyeSlash />,
        title: "System Tray",
        desc: "Roda oculto na bandeja do sistema para não incomodar na sua barra de tarefas."
      },
      {
        icon: <FaBoxOpen />,
        title: "Instalador Inno Setup",
        desc: "Empacotado perfeitamente em um instalador fácil e prático de usar (.exe)."
      }
    ],
    note: "⚠️ Nota: A API WASAPI permite capturar o áudio (Loopback) sem a necessidade de ativadores como 'Stereo Mix'.",
    downloadBtn: "Baixar Agora",
    featuresBtn: "Ver Recursos",
    downloadTitle: "Pronto para sincronizar seu áudio?",
    downloadDesc: "Baixe o instalador gerado e instale em ambas as máquinas (Notebook e Desktop) para começar.",
    reqTitle: "⚙️ Como Usar",
    reqs: [
      "No PC que vai TOCAR o som (Recebedor): Selecione o modo Server, anote o IP, e clique em Iniciar.",
      "No PC que vai ENVIAR o som (Transmissor): Selecione o modo Client, digite o IP do Servidor, e clique em Iniciar.",
      "Pronto! O áudio já estará sincronizado."
    ],
    downloading: "Baixando...",
    latestVersion: "Baixar Setup (.exe)",
    versionPrefix: "Versão",
    mbText: "MB",
    faqTitle: "Dúvidas Frequentes",
    faqItems: [
      {
        title: "O áudio tem muito atraso (latência)?",
        desc: "Não. Como o AudioSync utiliza o protocolo UDP dentro da sua rede local (Wi-Fi ou Cabo), a latência é quase imperceptível, ideal para consumo de mídia."
      },
      {
        title: "Windows Defender bloqueando a instalação?",
        desc: <>O Windows Defender pode exibir um alerta de segurança (SmartScreen) ao abrir ou instalar o programa porque ele não possui uma assinatura digital paga. O programa é 100% seguro (antivírus de terceiros como o Kaspersky não o bloqueiam) e de código aberto, permitindo que qualquer pessoa <a href="https://github.com/RafaelParoni/AUDIO-SYNC" target="_blank" rel="noopener noreferrer" style={{color: '#06B6D4', textDecoration: 'underline'}}>verifique o código fonte</a>. Basta clicar em 'Mais informações' e depois em 'Executar assim mesmo'.</>
      }
    ]
  },
  en: {
    heroTitle: "Audio Sync",
    heroSub: "Mirror your computer's audio in real-time to another machine on your local network.",
    heroDesc: "AudioSync is a software created to mirror, in real-time and with ultra-low latency (via UDP), all the audio from your computer (like a Laptop) directly to the speakers of another computer (like a Desktop PC) on the same local network. It uses the pyaudiowpatch library integrated with the native Windows WASAPI.",
    featuresTitle: "🌟 Features",
    features: [
      {
        icon: <FaWifi />,
        title: "Server & Client Mode",
        desc: "Easily configure which machine will Send the sound (Client) and which will Receive (Server)."
      },
      {
        icon: <FaLaptopCode />,
        title: "Premium GUI",
        desc: "Built with CustomTkinter featuring aesthetic gradients (Cyan/Dark Blue)."
      },
      {
        icon: <FaTerminal />,
        title: "Log Console",
        desc: "View errors or connections (Server/Client) in real-time conveniently using the native menu system."
      },
      {
        icon: <FaPlayCircle />,
        title: "Autostart & Autosync",
        desc: "Ability to start automatically with Windows (saved in Registry) and start syncing automatically upon opening."
      },
      {
        icon: <FaEyeSlash />,
        title: "System Tray",
        desc: "Runs hidden in the system tray so it doesn't clutter your taskbar."
      },
      {
        icon: <FaBoxOpen />,
        title: "Inno Setup Installer",
        desc: "Perfectly packaged in an easy and practical to use installer (.exe)."
      }
    ],
    note: "⚠️ Note: The WASAPI API allows capturing audio (Loopback) without the need for activators like 'Stereo Mix'.",
    downloadBtn: "Download Now",
    featuresBtn: "View Features",
    downloadTitle: "Ready to sync your audio?",
    downloadDesc: "Download the generated installer and install on both machines (Laptop and Desktop) to begin.",
    reqTitle: "⚙️ How to Use",
    reqs: [
      "On the PC that will PLAY the sound (Receiver): Select Server mode, note the IP, and click Start.",
      "On the PC that will SEND the sound (Transmitter): Select Client mode, enter the Server's IP, and click Start.",
      "Done! The audio will now be synchronized."
    ],
    downloading: "Downloading...",
    latestVersion: "Download Setup (.exe)",
    versionPrefix: "Version",
    mbText: "MB",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        title: "Is there a lot of audio delay (latency)?",
        desc: "No. Since AudioSync uses the UDP protocol within your local network (Wi-Fi or LAN), the latency is almost imperceptible, ideal for media consumption."
      },
      {
        title: "Windows Defender blocking the installation?",
        desc: <>Windows Defender might show a security alert (SmartScreen) when opening or installing the program because it does not have a paid digital signature. The software is 100% safe (third-party antiviruses like Kaspersky don't block it) and open-source, allowing anyone to <a href="https://github.com/RafaelParoni/AUDIO-SYNC" target="_blank" rel="noopener noreferrer" style={{color: '#06B6D4', textDecoration: 'underline'}}>verify the source code</a>. Just click on 'More info' and then 'Run anyway'.</>
      }
    ]
  },
  es: {
    heroTitle: "Audio Sync",
    heroSub: "Refleja el audio de tu computadora en tiempo real a otra máquina en tu red local.",
    heroDesc: "AudioSync es un software creado para reflejar, en tiempo real y con latencia ultrabaja (vía UDP), todo el audio de tu computadora (como una Laptop) directamente a los altavoces de otra computadora (como una PC de Escritorio) en la misma red local. Utiliza la biblioteca pyaudiowpatch integrada con la API nativa WASAPI de Windows.",
    featuresTitle: "🌟 Características",
    features: [
      {
        icon: <FaWifi />,
        title: "Modo Servidor y Cliente",
        desc: "Configura fácilmente qué máquina Enviará el sonido (Cliente) y cuál Recibirá (Servidor)."
      },
      {
        icon: <FaLaptopCode />,
        title: "Interfaz Gráfica Premium",
        desc: "Creada con CustomTkinter con gradientes estéticos (Cian/Azul Oscuro)."
      },
      {
        icon: <FaTerminal />,
        title: "Consola de Registros",
        desc: "Visualiza errores o conexiones (Servidor/Cliente) en tiempo real de forma práctica usando el sistema de menú nativo."
      },
      {
        icon: <FaPlayCircle />,
        title: "Autostart y Autosync",
        desc: "Capacidad de iniciar automáticamente con Windows (guardado en el Registro) e iniciar la sincronización automáticamente al abrir."
      },
      {
        icon: <FaEyeSlash />,
        title: "Bandeja del Sistema",
        desc: "Se ejecuta oculto en la bandeja del sistema para no molestar en tu barra de tareas."
      },
      {
        icon: <FaBoxOpen />,
        title: "Instalador Inno Setup",
        desc: "Empaquetado perfectamente en un instalador fácil y práctico de usar (.exe)."
      }
    ],
    note: "⚠️ Nota: La API WASAPI permite capturar el audio (Loopback) sin la necesidad de activadores como 'Stereo Mix'.",
    downloadBtn: "Descargar Ahora",
    featuresBtn: "Ver Características",
    downloadTitle: "¿Listo para sincronizar tu audio?",
    downloadDesc: "Descarga el instalador generado e instálalo en ambas máquinas (Laptop y Escritorio) para comenzar.",
    reqTitle: "⚙️ Cómo Usar",
    reqs: [
      "En la PC que REPRODUCIRÁ el sonido (Receptor): Selecciona el modo Servidor, anota la IP y haz clic en Iniciar.",
      "En la PC que ENVIARÁ el sonido (Transmisor): Selecciona el modo Cliente, ingresa la IP del Servidor y haz clic en Iniciar.",
      "¡Listo! El audio ya estará sincronizado."
    ],
    downloading: "Descargando...",
    latestVersion: "Descargar Setup (.exe)",
    versionPrefix: "Versión",
    mbText: "MB",
    faqTitle: "Preguntas Frecuentes",
    faqItems: [
      {
        title: "¿Hay mucho retraso de audio (latencia)?",
        desc: "No. Como AudioSync utiliza el protocolo UDP dentro de su red local (Wi-Fi o LAN), la latencia es casi imperceptible, ideal para el consumo de medios."
      },
      {
        title: "¿Windows Defender bloqueando la instalación?",
        desc: <>Windows Defender podría mostrar una alerta de seguridad (SmartScreen) al abrir o instalar el programa debido a que no tiene una firma digital de pago. El software es 100% seguro (antivirus de terceros como Kaspersky no lo bloquean) y de código abierto, permitiendo que cualquiera pueda <a href="https://github.com/RafaelParoni/AUDIO-SYNC" target="_blank" rel="noopener noreferrer" style={{color: '#06B6D4', textDecoration: 'underline'}}>verificar el código fuente</a>. Simplemente haz clic en 'Más información' y luego en 'Ejecutar de todas formas'.</>
      }
    ]
  }
};

export default function AudioSync() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('pt');
  const [release, setRelease] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const featureColors = [
    '#06B6D4', // Ciano
    '#3B82F6', // Azul
    '#10B981', // Verde
    '#F59E0B', // Laranja
    '#8B5CF6', // Roxo
    '#EC4899'  // Rosa
  ];

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Audio Sync";

    const link = document.querySelector("link[rel~='icon']");
    const originalHref = link ? link.href : '';
    if (link) {
      link.href = AudioSyncIcon;
    }

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
      if (link && originalHref) {
        link.href = originalHref;
      }
    };
  }, []);

  useEffect(() => {
    fetch('https://api.github.com/repos/RafaelParoni/AUDIO-SYNC/releases/latest')
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
  const downloadLink = exeAsset ? exeAsset.browser_download_url : "https://github.com/RafaelParoni/AUDIO-SYNC/releases/latest";

  return (
    <div className="paroni-sync-container">
      {/* NAVBAR */}
      <nav className="sync-nav">
        <div className="sync-nav-left">
          <a href={`https://www.instagram.com/${import.meta.env.VITE_INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="sync-icon-btn" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
          <a href="https://github.com/RafaelParoni/AUDIO-SYNC" target="_blank" rel="noopener noreferrer" className="sync-icon-btn" aria-label="Github">
            <FaGithub size={24} />
          </a>
        </div>

        <div className="sync-nav-center">
          <img src={AudioSyncLogo} alt="Logo" style={{ width: '28px', height: '28px', marginRight: '8px' }} />
          <span className="sync-nav-brand">Audio Sync</span>
          <Link to="/" className="sync-nav-subtitle">
            by: Rafael Paroni
          </Link>
        </div>

        <div className="sync-nav-right">
          <select
            className="sync-lang-select"
            value={lang}
            onChange={handleLangChange}
            aria-label="Selecionar Idioma"
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
          </select>

          <button
            className="sync-icon-btn"
            onClick={toggleTheme}
            aria-label="Alternar Tema"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="sync-hero animate-fade-in" style={{ paddingTop: '12rem', paddingBottom: '6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <img 
            src={AudioSyncLogo} 
            alt="Audio Sync Logo" 
            style={{ width: '90px', height: 'auto', filter: 'drop-shadow(0 4px 15px rgba(6, 182, 212, 0.5))' }} 
          />
          <h1 className="sync-title" style={{ background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', margin: 0 }}>
            {t.heroTitle}
          </h1>
        </div>
        <p className="sync-subtitle">{t.heroSub}</p>
        
        <p style={{ maxWidth: '800px', margin: '0 auto 2rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.1rem' }}>
          {t.heroDesc}
        </p>

        <div className="sync-btn-group" style={{ justifyContent: 'center' }}>
          <a href="#download" className="sync-btn sync-btn-primary" style={{ background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', border: 'none' }}>
            <FaDownload />
            {t.downloadBtn}
          </a>
          <a href="#recursos" className="sync-btn sync-btn-outline">
            <FaTools />
            {t.featuresBtn}
          </a>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="recursos" className="sync-features">
        <h2 className="sync-features-title">{t.featuresTitle}</h2>
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

        <div className="sync-note" style={{ borderLeftColor: '#06B6D4' }}>
          {t.note}
        </div>
      </section>

      {/* DOWNLOAD SECTION */}
      <section id="download" className="sync-download-section">
        <div className="sync-download-card">
          <h2>{t.downloadTitle}</h2>
          <p>{t.downloadDesc}</p>
          
          <div className="sync-req-list" style={{ textAlign: 'left', background: 'var(--nav-bg)', padding: '2rem', borderRadius: '12px' }}>
            <h4 style={{ color: '#06B6D4', fontSize: '1.2rem', marginBottom: '1rem' }}>{t.reqTitle}</h4>
            <ul style={{ listStyleType: 'decimal', paddingLeft: '1.5rem', margin: 0, color: 'var(--text-secondary)' }}>
              {t.reqs.map((req, idx) => (
                <li key={idx} style={{ marginBottom: '0.8rem', lineHeight: '1.5' }}>{req}</li>
              ))}
            </ul>
          </div>

          <br />

          <a href={downloadLink} className="sync-btn sync-btn-primary" style={{ display: 'inline-flex', padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', border: 'none' }}>
            <FaDownload size={20} />
            {t.latestVersion}
          </a>
          
          <span className="sync-version-info" style={{ display: 'block', marginTop: '1rem' }}>
            {t.versionPrefix} {release?.tag_name || 'v1.1'} • Windows 10/11 • {release?.assets?.[0]?.size ? (release.assets[0].size / 1024 / 1024).toFixed(1) + ` ${t.mbText}` : `~20 ${t.mbText}`}
          </span>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="sync-faq-section">
        <h2 className="sync-faq-title">{t.faqTitle}</h2>
        <div className="sync-faq-list">
          {t.faqItems.map((item, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div 
                key={idx} 
                className={`sync-faq-card ${isExpanded ? 'expanded' : ''}`}
              >
                <div 
                  className="sync-faq-header" 
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                >
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.title}</h3>
                  <button className="sync-faq-toggle-btn">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {isExpanded && (
                  <div className="sync-faq-content">
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
